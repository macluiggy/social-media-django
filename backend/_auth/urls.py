# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthView

router = DefaultRouter()
router.register(r'auth', AuthView)

urlpatterns = [
    path('', include(router.urls)),
]
