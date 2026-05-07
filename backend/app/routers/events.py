from fastapi import APIRouter, HTTPException
from app.data.events import events
from app.models.event import EventCreate
import uuid

router = APIRouter(prefix="/events", tags=["events"])


@router.get("/")
def get_events():
    return events


@router.get("/{event_id}")
def get_event(event_id: str):
    event = next((e for e in events if e["id"] == event_id), None)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.post("/", status_code=201)
def create_event(body: EventCreate):
    new_event = {"id": str(uuid.uuid4()), **body.model_dump()}
    events.append(new_event)
    return new_event
