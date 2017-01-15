import sys
from django import forms
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UsernameField, UserChangeForm, \
    SetPasswordForm, PasswordChangeForm
from django.utils.translation import ugettext_lazy as _
from datetime import datetime

from LearnSecurity.models import UserPic, PasswordRecoveryKey


class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True,
                             widget=forms.EmailInput(
                                 attrs={'class': 'form-control', 'placeholder': 'john.doe@gmail.com'}))
    first_name = forms.CharField(label="Name", required=False,
                                 widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'John'}))
    last_name = forms.CharField(label="Surname", required=False,
                                widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Doe'}))

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        self.fields['username'].label = "Username"
        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = 'Ninja007'
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['placeholder'] = '********'
        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['placeholder'] = '********'

    def save(self, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.email = self.cleaned_data['email']

        if commit:
            user.save()

        return user


class LoginForm(AuthenticationForm):
    remember = forms.BooleanField(required=False)

    def __init__(self, request=None, data=None, *args, **kwargs):
        super(LoginForm, self).__init__(data=data, *args, **kwargs)
        self.request = request
        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = 'Ninja007'
        self.fields['password'].widget.attrs['class'] = 'form-control'
        self.fields['password'].widget.attrs['placeholder'] = '********'
        self.fields['remember'].widget.attrs['class'] = 'form-check-input'


class EditUserForm(UserChangeForm):
    email = forms.EmailField(required=True,
                             widget=forms.EmailInput(attrs={'class': 'form-control'}))
    first_name = forms.CharField(label="Name", required=False,
                                 widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(label="Surname", required=False,
                                widget=forms.TextInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

    def __init__(self, *args, **kwargs):
        super(EditUserForm, self).__init__(*args, **kwargs)
        self.fields['username'].label = "Username"
        self.fields['username'].widget.attrs['class'] = 'form-control'

    def clean_password(self):
        pass


class ChangePasswordForm(PasswordChangeForm):
    def __init__(self, user, *args, **kwargs):
        super(ChangePasswordForm, self).__init__(user, *args, **kwargs)
        self.fields['new_password1'].widget.attrs['class'] = 'form-control'
        self.fields['new_password1'].widget.attrs['placeholder'] = '******'
        self.fields['new_password1'].required = False
        self.fields['new_password2'].widget.attrs['class'] = 'form-control'
        self.fields['new_password2'].widget.attrs['placeholder'] = '******'
        self.fields['new_password2'].required = False
        self.fields['old_password'].widget.attrs['class'] = 'form-control'
        self.fields['old_password'].widget.attrs['placeholder'] = '******'
        self.fields['old_password'].required = False


class ChangePicForm(forms.ModelForm):
    image = forms.ImageField()

    def __init__(self, *args, **kwargs):
        super(ChangePicForm, self).__init__(*args, **kwargs)
        self.fields['image'].widget.attrs['class'] = 'form-control'
        self.fields['image'].required = False
        self.fields['image'].widget.attrs['accept'] = 'image/png, image/jpeg, image/gif'

    class Meta:
        model = UserPic
        fields = ('image',)


class GetRecoveryKeyForm(forms.Form):
    error_messages = {"not_in_system": _("Provided username or e-mail is does not exist in the system.")}

    username = forms.CharField(label="Provide username or email in order to recover password.", required=True,
                               widget=forms.TextInput(
                                   attrs={'class': 'form-control', 'placeholder': 'John@mail.com'}))

    def clean_username(self):
        username = self.cleaned_data["username"]
        try:
            User.objects.get(email=username)
        except User.DoesNotExist:
            try:
                User.objects.get(username=username)
            except User.DoesNotExist:
                raise forms.ValidationError(
                    self.error_messages['not_in_system'],
                    code='not_in_system',
                )
        return username


class RecoveryForm(SetPasswordForm):
    error_messages = {"not_valid_key": _("The key is not correct or outdated."),
                      'password_mismatch': _("The two password fields didn't match.")}

    key = forms.CharField(label="Type key provided in an e-mail.", required=True,
                          widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'PAYm33hL'}))

    def __init__(self, user, *args, **kwargs):
        super(RecoveryForm, self).__init__(user, *args, **kwargs)
        self.fields['new_password1'].widget.attrs['class'] = 'form-control'
        self.fields['new_password1'].widget.attrs['placeholder'] = '******'
        self.fields['new_password1'].required = False
        self.fields['new_password2'].widget.attrs['class'] = 'form-control'
        self.fields['new_password2'].widget.attrs['placeholder'] = '******'
        self.fields['new_password2'].required = False

    def clean_key(self):
        key = self.cleaned_data["key"]

        try:
            password_recovery_key = PasswordRecoveryKey.objects.get(random_gen=key)
            if password_recovery_key.valid_until < datetime.now(password_recovery_key.valid_until.tzinfo):
                raise KeyOutdatedError()
        except (PasswordRecoveryKey.DoesNotExist, KeyOutdatedError):
            raise forms.ValidationError(
                self.error_messages['not_valid_key'],
                code='not_valid_key',
            )
        return key


class KeyOutdatedError(ValueError):
    pass
