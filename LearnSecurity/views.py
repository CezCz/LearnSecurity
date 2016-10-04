import json
import operator

from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from django.shortcuts import render
from django.template.context_processors import csrf

from LearnSecurity.forms import RegistrationForm, LoginForm, EditUserForm, ChangePasswordForm, ChangePicForm
from LearnSecurity.models import Maze, Level, LevelStep, UserPic, UserProgress


def index(request):
    mazes = Maze.objects.all()
    if request.user.is_authenticated:
        return render(request, "base.html", {"mazes": mazes, "image": UserPic.objects.get(user=request.user).image})
    else:
        return render(request, "base.html", {"mazes": mazes, "login_form": LoginForm()})


def basic_linux_info_handler(request, maze_name):
    maze = Maze.objects.get(name=maze_name)
    levels = list(Level.objects.filter(maze=maze))
    levels.sort(key=operator.attrgetter('level'))
    return render(request, "mazelevelcards.html", {"maze": maze, "levels": levels})


def basic_linux_handler(request, maze_name, level):
    maze = Maze.objects.get(name=maze_name)
    db_level = Level.objects.get(maze=maze, level=level)
    steps = list(LevelStep.objects.filter(level=db_level))
    steps = sorted(steps, key=operator.attrgetter('level_step'))

    passed_level_steps = []
    if request.user.is_authenticated:
        passed_steps = UserProgress.objects.filter(level_step__in=steps, user=request.user)
        passed_level_steps = [passed['level_step'] for passed in
                              LevelStep.objects.filter(userprogress__in=passed_steps).values('level_step')]

    return render(request, "basiclinux.html",
                  {"maze": maze, "level": db_level, "steps": steps, "passed_steps": passed_level_steps})


@login_required
def level_step_help(request, maze_name, level, step):
    maze = Maze.objects.get(name=maze_name)
    db_level = Level.objects.get(maze=maze, level=level)
    step = LevelStep.objects.get(level=db_level, level_step=step)
    return JsonResponse({'help': step.help})


def level_step_check_password(request, maze_name, level, step):
    maze = Maze.objects.get(name=maze_name)
    db_level = Level.objects.get(maze=maze, level=level)
    step = LevelStep.objects.get(level=db_level, level_step=step)
    answer = step.password == request.POST["answer"]
    if answer is True and request.user.is_authenticated:
        try:
            user_progress = UserProgress.objects.get(level_step=step, user=request.user)
            user_progress.passed = answer
            user_progress.save()
        except UserProgress.DoesNotExist:
            UserProgress(level_step=step, user=request.user, passed=answer).save()

    return JsonResponse({'check': answer})


@login_required
def level_step_peek_password(request, maze_name, level, step):
    maze = Maze.objects.get(name=maze_name)
    db_level = Level.objects.get(maze=maze, level=level)
    step = LevelStep.objects.get(level=db_level, level_step=step)
    return JsonResponse({'peek': step.password})


def log_in(request):
    form = LoginForm(request=request, data=request.POST)
    return_val = HttpResponseServerError(json.dumps(form.errors))
    if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return_val = HttpResponse()
            if not form.cleaned_data.get("remember"):
                request.session.set_expiry(0)

    return return_val


@login_required
def log_out(request):
    logout(request)
    if request.user.is_authenticated:
        return HttpResponseServerError()
    else:
        return HttpResponse()


def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserPic(image="images/cat.jpg", user=user).save()
            return HttpResponse()
        else:
            return HttpResponseServerError(json.dumps(form.errors))
    else:
        token = {'form': RegistrationForm()}
        token.update(csrf(request))
        return render(request, "register.html", token)


@login_required
def change_user_creds(request):
    if request.method == 'POST':
        form = EditUserForm(request.POST, instance=request.user)
        # pic_form = ChangePicForm(request.POST)
        if form.is_valid():
            # and pic_form.is_valid():
            form.save()
            # pic_form.user = request.user
            # pic_form.save()

            return HttpResponse()
        else:
            return HttpResponseServerError(json.dumps(form.errors))
    else:
        token = {'edit_user_form': EditUserForm(instance=request.user), "change_pic": ChangePicForm()}
        token.update(csrf(request))
        return render(request, "changeuser.html", token)


def login_component(request):
    return render(request, 'logincomponent.html')


@login_required
def change_user_password(request):
    if request.method == 'POST':
        form = ChangePasswordForm(data=request.POST, user=request.user)
        if form.is_valid():
            form.save()
            return HttpResponse()
        else:
            return HttpResponseServerError(json.dumps(form.errors))
    else:
        token = {'change_password_form': ChangePasswordForm(user=request.user)}
        token.update(csrf(request))
        return render(request, "changepassword.html", token)
