from unicodedata import name
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('orders/', views.order_list, name='orders'),
    path('order/<int:pk>', views.order_detail, name='order'),
    path('flights/', views.flight_list, name='flights'),
    path('flight/<int:pk>', views.flight_detail, name='flight'),
]
