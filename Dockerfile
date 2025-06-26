# ------------------- Frontend Build ---------------------
FROM node:20-alpine AS frontend

WORKDIR /frontend
COPY portfolio_frontend/package*.json ./
RUN npm ci
COPY portfolio_frontend/ ./
RUN npm run build

# ------------------- Backend Build ----------------------
FROM python:3.12-slim AS backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY portfolio_backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY portfolio_backend /app

# ✅ Copy frontend build output into staticfiles
COPY --from=frontend /frontend/dist /app/staticfiles

# ✅ Collect Django static files
RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "portfolio_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
