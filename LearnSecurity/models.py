from django.contrib.auth.models import User
from django.db import models
from django.contrib.postgres.fields import JSONField
from datetime import datetime
from datetime import timedelta


class Maze(models.Model):
    name = models.CharField(max_length=30)
    desc = models.CharField(max_length=30)
    difficulty = models.IntegerField()
    how_to = models.CharField(max_length=255)

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
    description = JSONField(default="")
    help = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

    def __str__(self):
        return "Step " + str(self.level_step) + " of " + str(self.level)


class UserProgress(models.Model):
    user = models.ForeignKey(User)
    level_step = models.ForeignKey(LevelStep)
    passed = models.BooleanField()

    def __str__(self):
        return "User " + self.user.email + " Progress of: " + str(self.level_step) + " Status: " + str(self.passed)


class UserPic(models.Model):
    user = models.OneToOneField(User)
    image = models.ImageField(default='/cat.jpg')


class PasswordRecoveryKey(models.Model):
    user = models.ForeignKey(User)
    random_gen = models.CharField(max_length=8)
    valid_until = models.DateTimeField()

    def save(self, *args, **kwargs):
        self.valid_until = datetime.now() + timedelta(minutes = 10)
        return super(PasswordRecoveryKey, self).save(*args, **kwargs)
