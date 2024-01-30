from rest_framework.response import Response
from rest_framework.views import APIView
from .. import serializers
from ..auth import JWTAuthentication


class JWTAuthenticationAPIView(APIView):
    authentication_classes = (JWTAuthentication,)


class UpdateJWTAPIView(APIView):

    def post(self, request):
        serializer = serializers.UpdateJWTSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.get_response())
