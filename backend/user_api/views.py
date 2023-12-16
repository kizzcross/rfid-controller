from rest_framework import viewsets

from .models import AppUser
from .serializers import AppUserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
	permission_classes = [AllowAny]
	queryset = AppUser.objects.all()
	serializer_class = AppUserSerializer

	def get(self, request, *args, **kwargs):
		permission_classes = [IsAuthenticated]
		return self.list(request, *args, **kwargs)
