from django.urls import path
from . import views

urlpatterns = [
    path("experiences/", views.experience_list),
    path("projects/", views.projects_list),
    path("skills/", views.category_list),
]
