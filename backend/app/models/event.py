from pydantic import BaseModel
from typing import Optional, Literal


class ScheduleItem(BaseModel):
    time: str
    activity: str


class Social(BaseModel):
    platform: Literal["linkedin", "twitter", "github", "instagram", "facebook", "website"]
    url: str


class Person(BaseModel):
    name: str
    title: str
    photo: Optional[str] = None
    socials: Optional[list[Social]] = None


class ArchiveItem(BaseModel):
    """A photo/video embedded from a public Facebook post — the media stays
    on Facebook, `url` is just the post's permalink."""
    type: Literal["video", "post"]
    url: str
    caption: Optional[str] = None


class EventCreate(BaseModel):
    title: str
    date: str
    # ISO dates ("YYYY-MM-DD"); optional so existing clients keep working.
    # Enables precise status detection (upcoming/ongoing/completed) on the frontend.
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    month: str
    type: str
    brief: str
    description: str
    location: str
    organizers: Optional[list[Person]] = None
    speakers: Optional[list[Person]] = None
    partners: Optional[list[Person]] = None
    capacity: Optional[int] = None
    duration: Optional[str] = None
    timeframe: Optional[str] = None
    schedule: Optional[list[ScheduleItem]] = None
    lumaUrl: Optional[str] = None
    archive: Optional[list[ArchiveItem]] = None
