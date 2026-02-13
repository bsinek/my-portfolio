from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path("", views.api_root, name='api-root'),
    path("experiences/", views.experience_list, name='experience-list'),
    path("projects/", views.projects_list, name='project-list'),
    path("skills/", views.category_list, name='skill-list'),
    path("resume/", views.resume_detail, name='resume-detail'),
]
