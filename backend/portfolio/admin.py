from django.contrib import admin
from .models import Skill, Project

admin.site.register(Skill)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    search_fields = ('name',)       # search by name
    list_display = ('name', 'year') # display columns
    ordering = ('-year', 'name')    # sort by year, then name
    