# Blog Management System

A full-stack Blog Management System built using Django, Django REST Framework, and React.js.

---

## Features

### Backend

* JWT Authentication
* Administrator can create users
* Create, Read, Update, and Delete blog posts
* Users can only modify their own posts
* Users can view posts created by other users
* Add comments to blog posts
* Users can edit and delete their own comments

### Frontend

* User Login
* View Blog Posts
* Create Blog Posts
* Edit/Delete Own Blog Posts
* View Post Details
* Add Comments
* Edit/Delete Own Comments
* Logout

---

## Technologies Used

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* SQLite

### Frontend

* React.js
* React Router DOM
* Axios

---

# Backend Setup

Clone the repository:

```bash
git clone <repository-url>
cd Blog-management-system
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

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

Create an administrator account:

```bash
python manage.py createsuperuser
```

Run the backend server:

```bash
python manage.py runserver
```

Backend URL:

```
http://127.0.0.1:8000/
```

---

# Frontend Setup

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm start
```

Frontend URL:

```
http://localhost:3000/
```

---

## Authentication

JWT Authentication is used.

Login:

```
POST /api/token/
```

Refresh Token:

```
POST /api/token/refresh/
```

---

## User Management

The administrator can create users using:

```bash
python manage.py createsuperuser
```

Users created by the administrator can log in through the React frontend application.

---

## API Endpoints

### Authentication

```
POST /api/token/
POST /api/token/refresh/
```

### Posts

```
GET    /api/posts/
POST   /api/posts/
GET    /api/posts/<id>/
PUT    /api/posts/<id>/
DELETE /api/posts/<id>/
```

### Comments

```
GET    /api/posts/<post_id>/comments/
POST   /api/posts/<post_id>/comments/
PUT    /api/posts/<post_id>/comments/<id>/
DELETE /api/posts/<post_id>/comments/<id>/
```

---

## Project Features Summary

* JWT Authentication
* Admin User Management
* User Login
* Blog Post CRUD Operations
* Comment CRUD Operations
* Protected User Content
* React Frontend Integration
