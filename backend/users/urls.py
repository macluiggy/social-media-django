# users/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import helloWorld


urlpatterns = [
    path('', helloWorld, name='helloWorld'),
]
