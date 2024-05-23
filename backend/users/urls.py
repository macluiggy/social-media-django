# users/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsersViewSet, hello_world

router = DefaultRouter()
router.register(r'users', UsersViewSet)

urlpatterns = [
    path('hello_world', hello_world, name='hello-world'),
    path('', include(router.urls)),
]
