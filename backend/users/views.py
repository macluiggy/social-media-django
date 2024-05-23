from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Users
from .serializers import UsersSerializer
from django.contrib.auth.hashers import make_password

# Create your views here.

def helloWorld(request):
    return HttpResponse("Hello, World!")
    