from django.db import models
from django.contrib.postgres.fields import JSONField


class Maze(models.Model):
    name = models.CharField(max_length=30)
    desc = models.CharField(max_length=30)
    difficulty = models.IntegerField()

    def __str__(self):
        return self.name + " Maze"


class Level(models.Model):
    maze = models.ForeignKey(Maze)
    level = models.IntegerField()
    # password = models.CharField(max_length=64)
    # password_next = models.CharField(max_length=64)
    short_description = models.CharField(max_length=200)
    program_description = JSONField()
    # riddle = JSONField()

    def __str__(self):
        return str(self.maze) + ", Level: " + str(self.level)

# Todo
# class UserProgress
