from django.contrib.auth.models import User
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

    def __str__(self):
        return str(self.maze) + ", Level: " + str(self.level)


class LevelStep(models.Model):
    level = models.ForeignKey(Level)
    level_step = models.IntegerField()
    description = models.CharField(max_length=200)
    help = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

    def __str__(self):
        return "Step " + str(self.level_step) + " of " + str(self.level)


class UserProgress(models.Model):
    user = models.ForeignKey(User)
    maze = models.ForeignKey(Maze)
    level = models.ForeignKey(Level)
    level_step = models.ForeignKey(LevelStep)
    passed = models.BooleanField()

    def __str__(self):
        return "User " + self.user.email + "Progress of: " + str(self.level_step) + "Status: " + str(self.passed)


class UserPic(models.Model):
    user = models.OneToOneField(User)
    image = models.ImageField(upload_to="images", default='images/cat.jpg')
