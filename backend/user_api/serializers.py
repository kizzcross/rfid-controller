from rest_framework import serializers
from django.contrib.auth import get_user_model

from user_api.models import AppUser
from django.contrib.auth.hashers import make_password

UserModel = get_user_model()


class AppUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = AppUser
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = AppUser.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            password=make_password(validated_data['password'])
        )
        return user
