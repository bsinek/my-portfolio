from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Experience, Project
from .serializers import ExperienceSerializer, ProjectSerializer

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
