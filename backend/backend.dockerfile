FROM python:3.12-slim

WORKDIR /app

COPY ./backend /app
COPY ./pyproject.toml ./

RUN pip install uv \
 && uv pip compile pyproject.toml --output-file requirements.txt \
 && pip install -r requirements.txt


CMD ["fastapi", "run", "api.py", "--host", "0.0.0.0", "--port", "8000"]

