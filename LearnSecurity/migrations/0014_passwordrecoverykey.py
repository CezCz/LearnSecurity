# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-01-08 18:17
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('LearnSecurity', '0013_maze_how_to'),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordRecoveryKey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('random_gen', models.CharField(max_length=8)),
                ('valid_until', models.DateTimeField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]