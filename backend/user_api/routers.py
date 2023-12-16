from rest_framework import routers

from user_api import views

routers = routers.DefaultRouter()
routers.register('user', views.UserViewSet)