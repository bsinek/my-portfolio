from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Experience, Project, Category
from .serializers import ExperienceSerializer, ProjectSerializer, CategorySerializer

@api_view(["GET"])
def experience_list(request):
    experiences = Experience.objects.all()
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def projects_list(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
