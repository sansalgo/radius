from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Profile)
admin.site.register(Watchlist)
admin.site.register(History)
admin.site.register(UserRating)