from rest_framework.decorators import api_view
from rest_framework.response import Response


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


@api_view(['GET', 'POST'])
def order_list(request):
    """
    List all orders, or create a new order.
    """
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        pass


@api_view(['GET', 'PUT', 'DELETE'])
def order_detail(request, pk):
    """
    Retrieve, update or delete an order.
    """
    try:
        pass
    except:
        pass

    if request.method == 'GET':
        pass

    elif request.method == 'PUT':
        pass

    elif request.method == 'DELETE':
        pass


@api_view(['GET', 'POST'])
def flight_list(request):
    """
    List all flights, or create a new flight.
    """
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        pass


@api_view(['GET', 'PUT', 'DELETE'])
def flight_detail(request, pk):
    """
    Retrieve, update or delete a flight.
    """
    try:
        pass
    except:
        pass

    if request.method == 'GET':
        pass

    elif request.method == 'PUT':
        pass

    elif request.method == 'DELETE':
        pass
