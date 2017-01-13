import json
import operator
import os
from base64 import b64decode

import collections
from datetime import datetime

from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from django.http.response import HttpResponseNotFound
from django.shortcuts import render
from django.template.context_processors import csrf
from django.utils.crypto import get_random_string

from LearnSecurity.forms import RegistrationForm, LoginForm, EditUserForm, ChangePasswordForm, ChangePicForm, \
    GetRecoveryKeyForm, RecoveryForm
from LearnSecurity.models import Maze, Level, LevelStep, UserPic, UserProgress, PasswordRecoveryKey
from LearnSecurity.utils import send_recovery_mail
from LearnSecurityApp.settings import MEDIA_ROOT


def index(request):
    mazes = Maze.objects.all()
    if request.user.is_authenticated:
        return render(request, "base.html", {"mazes": mazes, "image": UserPic.objects.get(user=request.user).image})
    else:
        return render(request, "base.html", {"mazes": mazes, "login_form": LoginForm()})


def maze_level_card_handler(request, maze_name):
    maze = Maze.objects.get(name=maze_name)
    levels = list(Level.objects.filter(maze=maze))
    levels.sort(key=operator.attrgetter('level'))
    return render(request, "mazelevelcards.html", {"maze": maze, "levels": levels})


def basic_linux_handler(request, maze_name, level):
    maze = Maze.objects.get(name=maze_name)
    db_level = Level.objects.get(maze=maze, level=level)
    db_level.program_description['Program']['sections'] = collections.OrderedDict(
        sorted(db_level.program_description['Program']['sections'].items()))
    steps = list(LevelStep.objects.filter(level=db_level))
    steps = sorted(steps, key=operator.attrgetter('level_step'))

    passed_level_steps = []
    if request.user.is_authenticated:
        passed_steps = UserProgress.objects.filter(level_step__in=steps, user=request.user)
        passed_level_steps = [passed['level_step'] for passed in
                              LevelStep.objects.filter(userprogress__in=passed_steps).values('level_step')]

    return render(request, "mazetemplate.html",
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

        if 'image' in request.POST:
            try:
                user_pic = UserPic.objects.get(user=request.user)
                unique_id = user_pic.image.name
                if unique_id != 'cat.jpg':
                    image = os.path.join(MEDIA_ROOT, unique_id)
                    os.remove(image)
                    unique_id = get_random_string(length=64)
            except:
                user_pic = UserPic()
                user_pic.user = request.user
                unique_id = get_random_string(length=64)

            image = request.POST['image']
            image_type = image[image.find('/') + 1:image.find(';')]
            image_base64 = image[image.find(',') + 1:]
            image_data = b64decode(image_base64)
            decoded_image = ContentFile(image_data, unique_id + '.' + image_type)
            pic_form_data = {"image": decoded_image}
            pic_form = ChangePicForm(pic_form_data, instance=user_pic)
            if pic_form.is_valid():
                user_pic.image = decoded_image
                user_pic.save()

        if form.is_valid():
            form.save()

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


def landing_page(request):
    return render(request, 'landingpage.html')


def get_key(request):
    if request.method == 'POST':
        form = GetRecoveryKeyForm(data=request.POST)
        if form.is_valid():

            isRandom = False
            for x in range(100):
                random_seq = get_random_string(8)
                try:
                    PasswordRecoveryKey.objects.get(random_gen=random_seq)
                except PasswordRecoveryKey.DoesNotExist:
                    isRandom = True
                    break

            if not isRandom:
                return HttpResponseServerError(json.dumps({'username': ['Something went wrong, try again later.']}))

            try:
                user = User.objects.get(username=form.cleaned_data['username'])
            except User.DoesNotExist:
                user = User.objects.get(email=form.cleaned_data['username'])

            try:
                passwordRecoveryKey = PasswordRecoveryKey.objects.get(user=user)
                if passwordRecoveryKey.valid_until < datetime.now():
                    passwordRecoveryKey.delete()
                    PasswordRecoveryKey(random_gen=random_seq, user=user).save()
            except:
                PasswordRecoveryKey(random_gen=random_seq, user=user).save()

            try:
                send_recovery_mail(random_seq, user.email)
            except:
                return HttpResponseServerError(json.dumps({'username': ['Something went wrong, try again later.']}))
            return HttpResponse()
        else:
            return HttpResponseServerError(json.dumps(form.errors))
    else:
        token = {'form': GetRecoveryKeyForm(), 'recovery_form': RecoveryForm(user=None)}
        token.update(csrf(request))
        return render(request, 'recoverstart.html', token)


def change_password_with_key(request):
    if request.method == 'POST':
        try:
            recoveryKey = PasswordRecoveryKey.objects.get(random_gen=request.POST['key'])
            user = recoveryKey.user
        except PasswordRecoveryKey.DoesNotExist:
            user = None
        form = RecoveryForm(user=user, data=request.POST)
        if form.is_valid():
            form.save()
            recoveryKey.delete()
            return HttpResponse()
        else:
            return HttpResponseServerError(json.dumps(form.errors))
    else:
        return HttpResponseNotFound()
