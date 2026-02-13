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
# PROJECTS
# ---------------------------------------------------

class Technology(models.Model):
    order = models.PositiveIntegerField(default=0)
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["order"]

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
