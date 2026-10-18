from django.shortcuts import render
from .models import item
# Create your views here.
def items_list(request):
    items= item.objects.all()
    return render(request, "core/item_list.html", {"items": items})