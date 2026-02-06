from django.contrib import admin
from .models import Experience, Skill, Project, ExperienceBullet

class ExperienceBulletInline(admin.TabularInline):
    model = ExperienceBullet

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'location', 'start_date', 'end_date')
    inlines = [ExperienceBulletInline]

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name', 'order', 'year')

admin.site.register(Skill)
