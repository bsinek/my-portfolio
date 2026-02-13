from rest_framework import serializers
from .models import Experience, Project, Category, Skill

class ExperienceSerializer(serializers.ModelSerializer):
    date_range = serializers.SerializerMethodField()
    bullets = serializers.SlugRelatedField(many=True, read_only=True, slug_field="text")

    class Meta:
        model = Experience
        fields = ["role", "company", "location", "date_range", "bullets"]

    def get_date_range(self, obj):
        start = obj.start_date.strftime("%b %Y")
        end = obj.end_date.strftime("%b %Y") if obj.end_date else "Present"
        return f"{start} - {end}"
    
class ProjectSerializer(serializers.ModelSerializer):
    techstack = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = Project
        exclude = ["id"]

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name", "icon", "order"]

class CategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["order", "category", "skills"]
