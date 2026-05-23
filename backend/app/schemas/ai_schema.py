from pydantic import BaseModel

class AIRequest(BaseModel):
    task: str