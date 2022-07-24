from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, PasswordResetForm, SetPasswordForm, PasswordChangeForm
from django.contrib.auth.models import User

from user.models import Profile

# for user registration
class UserRegisterForm(UserCreationForm):

    def clean_email(self):
        email = self.cleaned_data['email']
        try:
            match = User.objects.get(email=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError('email')

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(UserRegisterForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['placeholder'] = 'Username'
        self.fields['username'].widget.attrs['autocomplete'] = 'off'
        self.fields['email'].widget.attrs['placeholder'] = 'Email'
        self.fields['email'].widget.attrs['autocomplete'] = 'off'
        self.fields['password1'].widget.attrs['placeholder'] = 'Password'
        self.fields['password1'].widget.attrs['autocomplete'] = 'off'
        self.fields['password2'].widget.attrs['placeholder'] = 'Confirm Password'
        self.fields['password2'].widget.attrs['autocomplete'] = 'off'


# to change user profile details
class UserProfileForm(ModelForm):

    class Meta:
        model = Profile
        fields = ['name', 'username', 'email']

    def __init__(self, *args, **kwargs):
        super(UserProfileForm, self).__init__(*args, **kwargs)
        self.fields['name'].widget.attrs['placeholder'] = 'Name'
        self.fields['name'].widget.attrs['autocomplete'] = 'off'
        self.fields['username'].widget.attrs['placeholder'] = 'Username'
        self.fields['username'].widget.attrs['autocomplete'] = 'off'
        self.fields['email'].widget.attrs['placeholder'] = 'Email'
        self.fields['email'].widget.attrs['autocomplete'] = 'off'

    
# to reset the password
class UserPasswordResetForm(PasswordResetForm):
    def __init__(self, *args, **kwargs):
        super(UserPasswordResetForm, self).__init__(*args, **kwargs)

        self.fields['email'].widget.attrs['placeholder'] = 'Email'
        self.fields['email'].widget.attrs['autocomplete'] = 'off'

# to set user password
class UserSetPasswordForm(SetPasswordForm):
    def __init__(self, *args, **kwargs):
        super(UserSetPasswordForm, self).__init__(*args, **kwargs)

        self.fields['new_password1'].widget.attrs['placeholder'] = 'New Password'
        self.fields['new_password1'].widget.attrs['autocomplete'] = 'off'
        self.fields['new_password2'].widget.attrs['placeholder'] = 'Confirm Password'
        self.fields['new_password2'].widget.attrs['autocomplete'] = 'off'
        self.fields['new_password1'].required = False
        self.fields['new_password2'].required = False

# to change user password
class UserPasswordChangeForm(PasswordChangeForm):    
    def __init__(self, *args, **kwargs):
        super(UserPasswordChangeForm, self).__init__(*args, **kwargs)

        self.fields['old_password'].widget.attrs['placeholder'] = 'Old Password'
        self.fields['old_password'].widget.attrs['autocomplete'] = 'off'
        self.fields['new_password1'].widget.attrs['placeholder'] = 'New Password'
        self.fields['new_password1'].widget.attrs['autocomplete'] = 'off'
        self.fields['new_password2'].widget.attrs['placeholder'] = 'Confirm Password'
        self.fields['new_password2'].widget.attrs['autocomplete'] = 'off'
        self.fields['old_password'].required = False
        self.fields['new_password1'].required = False
        self.fields['new_password2'].required = False