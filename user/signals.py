from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

from plan.models import Subscription
from .models import *
import stripe
stripe.api_key = "sk_test_51Ks0jRCzX1BKhEVgrT6Tf7Z4eA3TyKrORgZWlIruIYMzW99CbOEJttUzKgNpwmgx2ABFmHTj8hwBeJlwtVJXroNI00AExA6O0q"

# signal to create a profile
@receiver(post_save, sender = User)
def createProfile(sender, instance, created, **kwargs):
    if created:
        user = instance
        profile = Profile.objects.create(
            user = user,
            name = user.first_name,
            username = user.username,
            email = user.email,
        )

        customer = stripe.Customer.create(
            name = user.username,
            email = user.email,
        )
        subscription = Subscription.objects.create(
            user = user,
            stripe_customer = customer.id
        )
    
        context = {'user': profile}
        subject = 'Welcome to Radius!'
        html_message = render_to_string('welcome_email.html', context)
        plain_message = strip_tags(html_message)

        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FORM_EMAIL,
            [profile.email],
            html_message= html_message,
            fail_silently= False
        )


# signal to update a profile
@receiver(post_save, sender = Profile)
def updateProfile(sender, instance, created, **kwargs):
    profile = instance
    user = profile.user
    if created == False:
        user.first_name = profile.name
        user.username = profile.username
        user.email = profile.email
        user.save()


# signal to delete a user
@receiver(post_delete, sender = Profile)
def deleteUser(sender, instance, **kwargs):

    try:
       instance.user
    except User.DoesNotExist:
        pass
    else: 
        instance.user.delete()
        
#post_save.connect(createProfile, sender=User)

#post_delete.connect(deleteUser , sender=Profile)