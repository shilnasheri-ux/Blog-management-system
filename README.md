# Blog Management System

A simple Blog Management System built using Django and Django REST Framework.

## Features

- Admin can create users
- JWT Authentication
- Users can create, view, update and delete their own blog posts
- Users can view posts created by other users
- Users can add comments to blog posts
- Users can only modify their own content

## Technologies Used

- Python
- Django
- Django REST Framework
- Simple JWT
- SQLite

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd Blog-management-system
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py migrate
```

Create superuser:

```bash
python manage.py createsuperuser
```

Run server:

```bash
python manage.py runserver
```

## API Endpoints

### Login

POST

```
/api/token/
```

### Refresh Token

POST

```
/api/token/refresh/
```

### Posts

```
GET /api/posts/
POST /api/posts/
GET /api/posts/<id>/
PUT /api/posts/<id>/
DELETE /api/posts/<id>/
```

### Comments

```
GET /api/posts/<post_id>/comments/
POST /api/posts/<post_id>/comments/
```

## Authentication

JWT Bearer Token Authentication is used.