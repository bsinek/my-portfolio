from rest_framework import serializers
from .models import Skill, Project

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name"]
    
class ProjectSerializer(serializers.ModelSerializer):
    techstack = serializers.SlugRelatedField(
        many=True, 
        read_only=True, 
        slug_field="name"
    )

    class Meta:
        model = Project
        exclude = ["id"]
