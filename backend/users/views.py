from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Users
from .serializers import UsersSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.decorators import api_view

# Create your views here.

def hello_world(request):
    return HttpResponse("Hello, World!")

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

    # @action(detail=False, methods=['post'])
    # def create_user(self, request):
    #     data = request.data
    #     data['password'] = make_password(data['password'])
    #     serializer = UsersSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def hello_world(self, request):
        # return Response({'message': 'Hello, World!'}, status=status.HTTP_200_OK)
        #  show all the users
        queryset = Users.objects.all()
        serializer = UsersSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    