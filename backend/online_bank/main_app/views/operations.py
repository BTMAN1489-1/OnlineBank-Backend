from django.db.models import Q
from rest_framework.response import Response
from ..exceptions import NotFoundException
from ..models import Account, Card, Operation
from .. import serializers
from . import JWTAuthenticationAPIView
from ..filters import OperationInfoFilter


class OperationInfoAPIView(JWTAuthenticationAPIView):
    def get(self, request):
        user = request.user
        filter_ = OperationInfoFilter.filter(request.GET)

        try:
            account = Account.objects.get(account_number=filter_[OperationInfoFilter.field_account_number.filter_name],
                                          user=user)
            filter_.pop(OperationInfoFilter.field_account_number.filter_name)
            filter_dict_from = {"description__From__account_number": account.account_number}
            filter_dict_to_account = {"description__To__account_number": account.account_number}
            filter_dict_to_card = {}

            token_card = filter_.get(OperationInfoFilter.field_token_card.filter_name, None)
            if token_card is not None:
                card = Card.objects.get(token_card=token_card, account=account)
                filter_.pop(OperationInfoFilter.field_token_card.filter_name)
                filter_dict_from.update({'description__From__card_number': card.card_number})
                filter_dict_to_card.update({'description__To__card_number': card.card_number})

            operations = Operation.objects.filter(
                Q(**filter_dict_from) | Q(**filter_dict_to_account) | Q(**filter_dict_to_card), **filter_).all()
            return Response(serializers.OperationInfoSerializer(operations, many=True).data)
        except (Account.DoesNotExist, Card.DoesNotExist):
            raise NotFoundException("История операций для указанный платежных данных недоступна")
