from django.core.mail import send_mail
from django.template import Context
from django.template.loader import render_to_string
import os


def send_recovery_mail(key, receiver):
    context = Context({'key': key})
    template = os.path.join("email_templates/recovery_mail.txt")

    text_content = render_to_string(template, context)
    # html_content = render_to_string("recovery_mail.html", context)

    send_mail("Recovery key for Learn Security", text_content, "cez@cez.com", [receiver])
