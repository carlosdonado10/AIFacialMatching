# Base image with Python 3.12
FROM python:3.12-slim

# Set working directory
WORKDIR /app
COPY ./pyproject.toml ./

# Install system dependencies
RUN apt-get update && apt-get install -y gcc libffi-dev libssl-dev && rm -rf /var/lib/apt/lists/*

RUN pip install uv \
 && uv pip compile pyproject.toml --output-file requirements.txt \
 && pip install -r requirements.txt

# Copy the rest of the app
COPY ./auth .

# Expose FastAPI's default port
EXPOSE 8000

# Run the app with uvicorn
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]