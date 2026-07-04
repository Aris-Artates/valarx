"""One-time helper: turn a short-lived Graph Explorer token into the
long-lived Page access token that GET /facebook/stats needs.

The only manual part is generating a short-lived token (requires logging in
as the page admin):

  1. Open https://developers.facebook.com/tools/explorer/
  2. In "Meta App", pick the VALARX app.
  3. Under "Permissions", add: pages_show_list, pages_read_engagement,
     read_insights.
  4. Click "Generate Access Token" and approve for the VALARX page.
  5. Copy the token, then from the backend/ folder run:

       .venv\\Scripts\\python.exe scripts\\get_page_token.py <that-token>

The script exchanges it for a long-lived user token (via FB_APP_ID /
FB_APP_SECRET from .env), lists your pages, and prints the FB_PAGE_ID and
FB_PAGE_ACCESS_TOKEN lines to paste into backend/.env. Page tokens minted
from a long-lived user token do not expire.
"""

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

from dotenv import load_dotenv

GRAPH_API = "https://graph.facebook.com/v23.0"


def graph_get(path: str, params: dict) -> dict:
    url = f"{GRAPH_API}/{path}?{urllib.parse.urlencode(params)}"
    try:
        with urllib.request.urlopen(url, timeout=15) as res:
            return json.load(res)
    except urllib.error.HTTPError as err:
        body = err.read().decode(errors="replace")
        sys.exit(f"Graph API error on /{path}:\n{body}")


def main() -> None:
    load_dotenv()
    app_id = os.getenv("FB_APP_ID")
    app_secret = os.getenv("FB_APP_SECRET")
    if not app_id or not app_secret:
        sys.exit("FB_APP_ID / FB_APP_SECRET missing from backend/.env")

    if len(sys.argv) != 2:
        sys.exit("Usage: python scripts/get_page_token.py <short-lived-user-token>")
    short_token = sys.argv[1]

    long_user = graph_get(
        "oauth/access_token",
        {
            "grant_type": "fb_exchange_token",
            "client_id": app_id,
            "client_secret": app_secret,
            "fb_exchange_token": short_token,
        },
    )["access_token"]
    print("Exchanged for a long-lived user token; fetching your pages...\n")

    pages = graph_get("me/accounts", {"access_token": long_user}).get("data", [])
    if not pages:
        sys.exit(
            "No pages came back. Make sure you generated the token while logged\n"
            "in as the VALARX page admin and granted pages_show_list."
        )

    for page in pages:
        print(f"# {page.get('name')}")
        print(f"FB_PAGE_ID={page.get('id')}")
        print(f"FB_PAGE_ACCESS_TOKEN={page.get('access_token')}")
        print()
    print("Paste the two lines for the VALARX page into backend/.env, then restart the backend.")


if __name__ == "__main__":
    main()
