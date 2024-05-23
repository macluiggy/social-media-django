from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
# Create your views here.

class AuthView(viewsets.ViewSet):
    @action(detail=False, methods=['post'], url_path='signin')
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse("Logged in")
        else:
            # return HttpResponse("Invalid credentials")
            # thorw an error
            # return HttpResponse("Invalid credentials", status=401)
            raise ValidationError("Invalid credentials")

    @action(detail=False, methods=['post'], url_path='signup')
    def register(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if User.objects.filter(username=username).exists():
            return HttpResponse("Username already exists")
        else:
            User.objects.create_user(username, password=password)
            return HttpResponse("Registered")

    @action(detail=False, methods=['post'], url_path='signout')
    def logout(self, request):
        logout(request)
        return HttpResponse("Logged out")