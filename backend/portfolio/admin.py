from django.contrib import admin
from .models import ExperienceBullet, Experience, Technology, Project

class ExperienceBulletInline(admin.TabularInline):
    model = ExperienceBullet
    extra = 1

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'location', 'start_date', 'end_date')
    inlines = [ExperienceBulletInline]

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name', 'order', 'year')

admin.site.register(Technology)
