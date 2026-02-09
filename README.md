# Developer Portfolio

A full-stack portfolio application built with a decoupled React frontend and Django REST API.

See it live: https://bensinek.dev  
Admin panel (for site management only): https://api.bensinek.dev/admin/

## Preview
<img src="frontend/public/img/projects/portfolio.jpg" alt="Portfolio Screenshot" width="600">

## Tech Stack
* **Frontend:** React (Vite), Tailwind CSS
* **Backend:** Django, Django REST Framework
* **Database:** PostgreSQL (Hosted via Railway)
* **Deployment:** Vercel (Frontend), Railway (Backend)

## Project Structure
* `/frontend`: React application (Vite).
* `/backend`: Django project, REST API, and Admin panel.

## Setup and Installation

### Backend
1. cd backend
2. python3 -m venv venv
3. Activate the virtual environment:
   - source venv/bin/activate (macOS/Linux)
   - venv\Scripts\activate (Windows)
4. pip install -r requirements.txt
5. python manage.py migrate
6. python manage.py runserver

### Frontend
1. cd frontend
2. npm install
3. Create a .env file with VITE_API_URL=http://127.0.0.1:8000
4. npm run dev

## Data Management
Database state is managed via JSON serialization for portability and version control.

* **Export Data:**
```bash
python3 manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission --indent 2 > data_backup.json
