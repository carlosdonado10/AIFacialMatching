FROM python:3.10-slim

RUN apt-get update && apt-get install -y g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./backend /app
COPY ./pyproject.toml ./

RUN pip install uv \
 && uv pip compile pyproject.toml --output-file requirements.txt \
 && pip install -r requirements.txt

RUN pip install debugpy


CMD ["python", "-m", "debugpy", "--listen", "0.0.0.0:5678", "--wait-for-client", "-m", "uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
#CMD ["fastapi", "run", "api.py", "--host", "0.0.0.0", "--port", "8000"]

