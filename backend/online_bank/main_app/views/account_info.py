from django.core.exceptions import ValidationError as ModelError
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError as APIError
from ..models import Account
from .. import serializers
from . import JWTAuthenticationAPIView
from rest_framework.views import APIView
from ..filters import AccountInfoFilter


class AccountInfoAPIView(JWTAuthenticationAPIView):

    def get(self, request):
        user = request.user
        filter_ = AccountInfoFilter.filter(request.GET)
        accounts = Account.objects.filter(user=user, **filter_).all()
        return Response(serializers.AccountInfoSerializer(accounts, many=True).data)


class HasAccountAPIView(APIView):

    def get(self, request):
        account_number = request.GET.get('account_number', None)
        res = Account.objects.filter(account_number=account_number).exists()
        return Response({"has_account": res})


class CreateAccountAPIView(JWTAuthenticationAPIView):

    def post(self, request):
        serializer = serializers.CreateAccountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.get_response())
