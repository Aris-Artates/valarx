import json
import os
import time
import urllib.parse
import urllib.request

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/facebook", tags=["facebook"])

GRAPH_API = "https://graph.facebook.com/v23.0"

# Page insights only update daily, so an hour of caching is plenty and keeps
# us far away from Graph API rate limits.
CACHE_TTL_SECONDS = 3600

_cache: dict | None = None
_cache_at: float = 0.0


def _graph_get(path: str, params: dict) -> dict:
    query = urllib.parse.urlencode(params)
    with urllib.request.urlopen(f"{GRAPH_API}/{path}?{query}", timeout=10) as res:
        return json.load(res)


@router.get("/stats")
def get_stats():
    """Public page stats (followers, likes, 28-day page visits), proxied
    through the backend so the page access token never reaches the browser.

    Requires FB_PAGE_ID and FB_PAGE_ACCESS_TOKEN in the environment — returns
    503 until they're configured, which the frontend treats as "hide the
    stats strip".
    """
    global _cache, _cache_at

    page_id = os.getenv("FB_PAGE_ID")
    token = os.getenv("FB_PAGE_ACCESS_TOKEN")
    if not page_id or not token:
        raise HTTPException(status_code=503, detail="Facebook integration not configured")

    if _cache is not None and time.time() - _cache_at < CACHE_TTL_SECONDS:
        return _cache

    stats = {"followers": None, "likes": None, "pageVisits": None}

    # Each metric fails independently — partial stats are still worth showing,
    # and the frontend skips whatever comes back as null.
    try:
        page = _graph_get(
            page_id,
            {"fields": "followers_count,fan_count", "access_token": token},
        )
        stats["followers"] = page.get("followers_count")
        stats["likes"] = page.get("fan_count")
    except Exception:
        pass

    try:
        insights = _graph_get(
            f"{page_id}/insights",
            {"metric": "page_views_total", "period": "days_28", "access_token": token},
        )
        values = (insights.get("data") or [{}])[0].get("values") or []
        if values:
            stats["pageVisits"] = values[-1].get("value")
    except Exception:
        pass

    if all(value is None for value in stats.values()):
        raise HTTPException(status_code=502, detail="Facebook Graph API unavailable")

    _cache, _cache_at = stats, time.time()
    return stats
