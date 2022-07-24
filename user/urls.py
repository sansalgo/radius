from django.urls import path
from . import views


app_name = 'user'
urlpatterns = [
    path('profile/', views.profile, name='profile'),
    path('login/', views.userlogin, name='login'),
    path('logout/', views.userlogout, name='logout'),
    path('register/', views.userregister, name='register'),
    path('watchlist/', views.watchlist, name='watchlist'),
    path('add-history/', views.addHistory, name='add-history'),
    path('clear-history/', views.clearHistory, name='clear-history'),
    path('user-rating/', views.userRating, name='user-rating'),
]