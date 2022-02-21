from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import mixins, generics

from .serializers import OrderSerializer, FlightSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/orders/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of orders'
        },
    ]
    return Response(routes)


class OrderList(APIView):
    """
    List all orders, or create a new order.
    """
    def get(self, request):
        pass

    def post(self, request):
        pass


class OrderDetail(APIView):
    """
    Retrieve, update or delete an order instance.
    """
    def get_object(self, pk):
        pass

    def get(self, request, pk):
        pass

    def put(self, request, pk):
        pass

    def delete(self, request, pk):
        pass


class FlightList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = ...
    serializer_class = FlightSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class FlightDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = ...
    serializer_class = FlightSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
