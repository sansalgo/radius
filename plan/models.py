from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# options for subscription plan
LABEL = [
    ('Null', 'N'),
    ('Regular', "R"),
    ('Standard','S'),
    ('Premium', 'P')
]

class Plan(models.Model):
    label = models.CharField(max_length=45, choices=LABEL, default='N')
    price = models.IntegerField(default=0)
    price_id = models.CharField(max_length=45)

    def __str__(self):
        return self.label

def setNull():
    return Plan.objects.get(price_id = 'n-u-l-l').pk


class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_customer = models.CharField(max_length=65, blank=True, null=True)
    stripe_subscription = models.CharField(max_length=105, blank=True, null=True)
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, default=setNull, null=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
