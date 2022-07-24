from django.db import models
from django.contrib.auth.models import User
from django.core.validators import *
from django.db.models.signals import post_save, post_delete

from base.models import Movie

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, default='')
    username = models.CharField(max_length=25, blank=True, null=True)
    email = models.EmailField(max_length=555, blank=True, null=True)

    def __str__(self):
        return str(self.user.username)

# content type
TYPE = [
    ('Null', 'N'),
    ('Movies', "M"),
    ('TVShows','T'),
]

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    type = models.CharField(max_length=15, choices=TYPE, default='N')
    slug = models.CharField(max_length=255, null = True, blank = True)

    def __str__(self):
        return ('{} - {}'.format(str(self.user.username),str(self.slug)))

class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateField()
    type = models.CharField(max_length=15, choices=TYPE, default='N')
    slug = models.CharField(max_length=255, null = True, blank = True)

    def __str__(self):
        return ('{} - {} - {}'.format(str(self.user.username),str(self.date),str(self.slug)))


class UserRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    type = models.CharField(max_length=15, choices=TYPE, default='N')
    movie 	= models.ForeignKey(Movie,on_delete=models.CASCADE, blank=True, null=True)
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(8)])

    def __str__(self):
        return ('{} - {} - {}'.format(str(self.user.username),str(self.movie.slug),str(self.rating)))