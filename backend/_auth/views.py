from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
# Create your views here.

class AuthView(viewsets.ViewSet):
    @action(detail=False, methods=['get'], url_path='signin')
    def login(self, request):
        return HttpResponse("Login page")

    def register(self, request):
        return HttpResponse("Register page")

    def logout(self, request):
        return HttpResponse("Logout page")