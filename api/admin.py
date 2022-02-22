from django.contrib import admin

from .models import Order, Flight

admin.site.register(Order)
admin.site.register(Flight)
