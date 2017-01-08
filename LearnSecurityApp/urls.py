"""LearnSecurityApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include
from django.contrib import admin

from LearnSecurity import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^LandingPage/', views.landing_page),
    url(r'^Maze/(?P<maze_name>[a-zA-Z0-9]+)$', views.maze_level_card_handler),
    url(r'^Maze/(?P<maze_name>[a-zA-Z0-9]+)/(?P<level>[0-9][0-9]?)$', views.basic_linux_handler),
    url(r'^Maze/(?P<maze_name>[a-zA-Z0-9]+)/(?P<level>[0-9][0-9]?)/help/(?P<step>[0-9])$', views.level_step_help),
    url(r'^Maze/(?P<maze_name>[a-zA-Z0-9]+)/(?P<level>[0-9][0-9]?)/check/(?P<step>[0-9])$',
        views.level_step_check_password),
    url(r'^Maze/(?P<maze_name>[a-zA-Z0-9]+)/(?P<level>[0-9][0-9]?)/peek/(?P<step>[0-9])$',
        views.level_step_peek_password),
    url(r'^admin/', admin.site.urls),
    url(r'^login/', views.log_in),
    url(r'^logout/', views.log_out),
    url(r'^register/', views.register),
    url(r'^change/credentials/', views.change_user_creds),
    url(r'^change/password/', views.change_user_password)
]
