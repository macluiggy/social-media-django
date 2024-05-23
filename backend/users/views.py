import json
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

def helloWorld(request):
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
    
    def create(self, request, *args, **kwargs):
        ## check if the user already exists by email or username
        email = request.data.get('email')
        username = request.data.get('username')
        if Users.objects.filter(email=email).exists():
            return Response({'message': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'], url_path='hello-world/(?P<name>[^/.]+)')
    # @action(detail=False, methods=['get'], url_path='hello-world/:name')
    def hello_world(self, request, pk=None, name=None):
        # return Response({'message': 'Hello, World!'}, status=status.HTTP_200_OK)
        #  show all the users
        queryset = Users.objects.all()
        serializer = UsersSerializer(queryset, many=True)
        print('name:', self.kwargs)
        name = self.kwargs.get('name')
        query_params = request.query_params
        print('query_params:', query_params)
        world = query_params.get('world')
        
        # return Response(serializer.data, status=status.HTTP_200_OK)
        #  return dummy data
        return Response({'message': 'Hello, World!', name: name, world: world }, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='get-users-emails')
    def get_users_emails(self, request):
        queryset = Users.objects.all()
        # print like in javascript JSON.stringify(queryset)
        # print('queryset:', json.dumps(queryset))
        serializer = UsersSerializer(queryset, many=True)
        emails = [user['email'] for user in serializer.data]
        return Response(emails, status=status.HTTP_200_OK)
    