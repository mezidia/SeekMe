from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('orders/', views.OrderList.as_view()),
    path('orders/<int:pk>/', views.OrderDetail.as_view()),
]
