from xml.etree.ElementInclude import include

from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import routers

from user_api import views as user_views
from rfid import views as rfid_views


routers = routers.DefaultRouter()
routers.register('user', user_views.UserViewSet)
routers.register('classroom', rfid_views.ClassRoomViewSets)
routers.register('student', rfid_views.StudentViewSets)
routers.register('studentclassroom', rfid_views.StudentClassRoomViewSets)
routers.register('studentclassroomlog', rfid_views.StudentClassRoomLogViewSets)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('students-in-classroom/<int:classroom>', rfid_views.ListAllStudentsInClassRoom.as_view()),
    path('update-student-classroom-status', rfid_views.UpdateStudentClassRoomStatus.as_view()),
]

urlpatterns += routers.urls
