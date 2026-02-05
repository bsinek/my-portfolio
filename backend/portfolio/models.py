from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    order = models.PositiveIntegerField(default=0)
    name = models.CharField(max_length=200)
    description = models.TextField()
    techstack = models.ManyToManyField(Skill, blank=True)
    year = models.IntegerField()
    link = models.URLField()

    # image paths
    preview = models.CharField(max_length=300)
    icon = models.CharField(max_length=300)

    class Meta:
        ordering = ["order", "-year"]

    def __str__(self):
        return self.name
    