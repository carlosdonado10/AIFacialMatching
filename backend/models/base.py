from typing import Optional, List, TypeVar

from sqlmodel import BaseModel, Field, Session, Select

from backend.utils import engine

T = TypeVar('BaseDataModel')

class BaseDataModel(BaseModel, table=False):
    id: Optional[int] = Field(default=None, primary_key=True)


    @classmethod
    def get_list_of_records(cls, skip: int, limit: int) -> List[T]:

        statement = Select(cls).offset(skip).limit(limit)

        with Session(engine) as db:
            return db.exec(statement).all()

    @classmethod
    def upsert_records(cls, records: List[T]) -> None:
        with Session(engine) as db:
            ...

