from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status

@api_view(['POST'])
def login(request):
    return Response({'token': '1234'})

@api_view(['POST'])
def register(request):
    
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    return Response({'token': ' 1234'})

@api_view(['POST'])
def profile(request):
    return Response({'token': '1234'})