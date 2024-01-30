from rest_framework.response import Response
from ..models import Card
from .. import serializers
from . import JWTAuthenticationAPIView
from ..filters import CardInfoFilter


class CardInfoAPIView(JWTAuthenticationAPIView):
    def get(self, request):
        user = request.user
        filter_ = CardInfoFilter.filter(request.GET)
        cards = Card.objects.filter(account__user=user, **filter_).select_related("account").all()
        return Response(serializers.CardInfoSerializer(cards, many=True).data)


class CreateCardAPIView(JWTAuthenticationAPIView):
    def post(self, request):
        serializer = serializers.CreateCardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.get_response())


class BlockCardAPIView(JWTAuthenticationAPIView):
    def post(self, request):
        serializer = serializers.BlockCardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.get_response())
