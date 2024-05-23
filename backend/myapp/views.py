from django.shortcuts import render, HttpResponse
from .models import todoItem


# Create your views here.
def home(request):
    # return HttpResponse("Hello, World!")
    return render(request, "home.html")


def todos(request):
    items = todoItem.objects.all()
    # return HttpResponse('items')
    return render(
        request,
        "todos.html",
        {
            "todos": items,
        },
    )
