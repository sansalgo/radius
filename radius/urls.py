"""radius URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.contrib.auth import views as auth_views
from user.forms import UserPasswordResetForm, UserSetPasswordForm

# to change the header and title of the admin site
admin.site.site_header = 'Radius administration'
admin.site.site_title = 'Radius administration'


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('base.urls', namespace='base')),
    path('', include('user.urls', namespace='user')),
    path('', include('plan.urls', namespace='plan')),

    # for password reset process
    path('reset_password/', auth_views.PasswordResetView.as_view(template_name="reset_password.html", html_email_template_name="password_reset_email.html",
        from_email = settings.DEFAULT_FORM_EMAIL, subject_template_name = "password_reset_subject.txt",
        form_class=UserPasswordResetForm), name="reset_password"),
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(template_name="reset_password_sent.html"),
        name="password_reset_done"),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="reset.html",
        form_class=UserSetPasswordForm), name="password_reset_confirm"),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(template_name="reset_password_complete.html"),
        name="password_reset_complete"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# to handle response status
handler404 = 'base.views.pageNotFound'
handler500 = 'base.views.serverError'
handler403 = 'base.views.permissionDenied'
handler400 = 'base.views.badRequest'