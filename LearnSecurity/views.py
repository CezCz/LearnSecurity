import json
import operator

from django.http import HttpResponse
from django.shortcuts import render, render_to_response

from LearnSecurity.models import Maze, Level


def index(request):
    mazes = Maze.objects.all()
    return render(request, "base.html", {"mazes": mazes})


def basicLinuxInfoHandler(request, mazeName):
    maze = Maze.objects.get(name=mazeName)
    levels = list(Level.objects.filter(maze=maze))
    levels.sort(key=operator.attrgetter('level'))
    return render_to_response("mazelevelcards.html", {"maze": maze, "levels": levels})


def basicLinuxHandler(request, mazeName, level):
    maze = Maze.objects.get(name=mazeName)
    db_level = Level.objects.get(maze=maze, level=level)
    return render_to_response("basiclinux.html", {"maze": maze, "level": db_level})
