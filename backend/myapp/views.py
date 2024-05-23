from django.shortcuts import render
from django.http import HttpResponse
from .models import todoItem
from django.http import JsonResponse


# Create your views here.
def home(request):
    return HttpResponse("Hello, World!")


def todos(request):
    items = todoItem.objects.all()
    return JsonResponse(list(items.values()), safe=False)
