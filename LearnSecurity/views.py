import json
import operator

from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from django.shortcuts import render, render_to_response

from LearnSecurity.models import Maze, Level, LevelStep


def index(request):
    mazes = Maze.objects.all()
    return render(request, "base.html", {"mazes": mazes})


def basic_linux_info_handler(request, mazeName):
    maze = Maze.objects.get(name=mazeName)
    levels = list(Level.objects.filter(maze=maze))
    levels.sort(key=operator.attrgetter('level'))
    return render_to_response("mazelevelcards.html", {"maze": maze, "levels": levels})


def basic_linux_handler(request, mazeName, level):
    maze = Maze.objects.get(name=mazeName)
    db_level = Level.objects.get(maze=maze, level=level)
    steps = list(LevelStep.objects.filter(level=db_level))
    steps = sorted(steps, key=operator.attrgetter('level_step'))
    return render_to_response("basiclinux.html", {"maze": maze, "level": db_level, "steps": steps})


def level_step_help(request, mazeName, level, step):
    maze = Maze.objects.get(name=mazeName)
    db_level = Level.objects.get(maze=maze, level=level)
    step = LevelStep.objects.get(level=db_level, level_step=step)
    return JsonResponse({'help': step.help})


def level_step_check_password(request, mazeName, level, step):
    maze = Maze.objects.get(name=mazeName)
    db_level = Level.objects.get(maze=maze, level=level)
    step = LevelStep.objects.get(level=db_level, level_step=step)
    answer = step.password == request.POST["answer"]
    return JsonResponse({'check': answer})


def level_step_peek_password(request, mazeName, level, step):
    maze = Maze.objects.get(name=mazeName)
    db_level = Level.objects.get(maze=maze, level=level)
    step = LevelStep.objects.get(level=db_level, level_step=step)
    return JsonResponse({'peek': step.password})


def log_in(request):
    username = request.POST['username']
    password = request.POST['password']
    remember = request.POST['remember']

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        if remember:
            request.session.set_expiry(0)
        returnVal = HttpResponse()
    else:
        returnVal = HttpResponseServerError()

    return returnVal


def log_out(request):
    logout(request)
    if request.user.is_authenticated:
        return HttpResponseServerError()
    else:
        return HttpResponse()


def register(request):
    return None


def loginComponent(request):
    return render(request, 'logincomponent.html')
