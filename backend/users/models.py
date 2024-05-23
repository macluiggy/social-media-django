from django.db import models

# Create your models here.


class Users(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100, null=True)
    fullName = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=150, null=True)
    isPasswordReset = models.BooleanField(default=False)
    signature = models.CharField(max_length=255, null=True)
    isActive = models.BooleanField(default=True)
    role = models.CharField(max_length=50, default="user")
    preferredLanguage = models.CharField(max_length=50, default="en")
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(null=True)
    phone = models.CharField(max_length=100, default="")
    profileImageKey = models.CharField(max_length=255, null=True)
    profileImageUrl = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.username
