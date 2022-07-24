from django.urls import path
from . import views

app_name = 'plan'
urlpatterns = [
    path('plans/', views.plans, name='plans'),
    path('subscription/<str:plan>/', views.subscription, name='subscription'),
    path('congratulations/', views.success, name='congratulations'),
    path('create-subscription', views.createSubscription, name='create-subscription'),
]