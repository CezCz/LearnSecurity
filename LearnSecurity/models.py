from django.db import models
from django.contrib.postgres.fields import JSONField


class Maze(models.Model):
    name = models.CharField(max_length=30)
    difficulty = models.IntegerField()
    type = models.CharField(max_length=100)


class Level(models.Model):
    level = models.IntegerField()
    password = models.CharField(max_length=64)
    password_next = models.CharField(max_length=64)
    lecture_id = models.CharField(max_length=5)
    description = models.CharField(max_length=200)
    riddle = JSONField()

# Todo
# class UserProgress
