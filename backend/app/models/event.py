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


class EventCreate(BaseModel):
    title: str
    date: str
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
