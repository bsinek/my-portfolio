from django.contrib import admin
from .models import ExperienceBullet, Experience, Technology, Project, Skill, Category

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

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category', 'order')
    inlines = [SkillInline]

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'icon', 'order')
    list_filter = ('category',)