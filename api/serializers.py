from rest_framework.serializers import ModelSerializer

from .models import Order, Flight


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class FlightSerializer(ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

