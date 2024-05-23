from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from rest_framework_simplejwt.tokens import RefreshToken

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        

class MyTokenObtainPairSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                refresh = RefreshToken.for_user(user)
                return {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            else:
                raise serializers.ValidationError("User is deactivated.")
        else:
            raise serializers.ValidationError("Invalid credentials.")