from django.urls import path
from . import views

app_name = 'base'
urlpatterns = [
    path('', views.home, name='home'),
    path('movies/', views.movies, name='movies'),
    path('tv-shows/', views.tvShows, name='tv-shows'),
    path('search/', views.search, name='search'),
    path('player/<slug:slug>/', views.player, name='player'),       
]