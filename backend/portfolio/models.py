from django.db import models
from django.db.models import F

 
# ---------------------------------------------------
# EXPERIENCE
# ---------------------------------------------------

class Experience(models.Model):
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = [F("end_date").desc(nulls_first=True), "-start_date"]

    def __str__(self):
        return f"{self.role} at {self.company}"
    

class ExperienceBullet(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, related_name="bullets")
    text = models.TextField()

    def __str__(self):
        return self.text[:50] + "..." if len(self.text) > 50 else self.text


# ---------------------------------------------------
# SKILLS
# ---------------------------------------------------

class Category(models.Model):
    order = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=200)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Skill Categories"

    def __str__(self):
        return self.category

class Skill(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="skills")
    order = models.PositiveIntegerField(default=0)
    name = models.CharField(max_length=200)
    icon = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # auto generates icon if blank
        if not self.icon:
            cleaned = self.name.replace("-", " ").replace(".", " ")
            pascal = "".join(word[:1].upper() + word[1:] for word in cleaned.split())
            self.icon = f"{pascal}Icon"
        super().save(*args, **kwargs)


# ---------------------------------------------------
# PROJECTS
# ---------------------------------------------------

class Technology(models.Model):
    order = models.PositiveIntegerField(default=0)
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Technologies"

    def __str__(self):
        return self.name

class Project(models.Model):
    order = models.PositiveIntegerField(default=0)
    name = models.CharField(max_length=200)
    description = models.TextField()
    techstack = models.ManyToManyField(Technology, blank=True)
    year = models.IntegerField()
    link = models.URLField()

    # image paths
    thumbnail = models.CharField(max_length=300)
    icon = models.CharField(max_length=300)

    class Meta:
        ordering = ["order", "-year"]

    def __str__(self):
        return self.name


# ---------------------------------------------------
# RESUME
# ---------------------------------------------------

class Resume(models.Model):
    title = models.CharField(max_length=200, blank=True)
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return f"{self.title} {'(Active)' if self.is_active else ''}"
    
    def save(self, *args, **kwargs):
        # auto generate title with filename if not provided
        if not self.title and self.file:
            import os
            filename = os.path.basename(self.file.name)
            self.title = os.path.splitext(filename)[0].replace('_', ' ').replace('-', ' ')
        
        # If this resume is set to active, deactivate all others
        if self.is_active:
            Resume.objects.exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)
