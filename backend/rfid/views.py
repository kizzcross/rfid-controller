from django.shortcuts import render
from django.utils.datetime_safe import datetime

from .models import Student, ClassRoom, StudentClassRoom, StudentClassRoomLog
from .serializer import StudentSerializer, ClassRoomSerializer, StudentClassRoomSerializer, \
    StudentClassRoomLogSerializer
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated


# Create your views here.

class ClassRoomViewSets(viewsets.ModelViewSet):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer
    permission_classes = [AllowAny]


class StudentViewSets(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]


class StudentClassRoomViewSets(viewsets.ModelViewSet):
    queryset = StudentClassRoom.objects.all()
    serializer_class = StudentClassRoomSerializer
    permission_classes = [AllowAny]


class StudentClassRoomLogViewSets(viewsets.ModelViewSet):
    queryset = StudentClassRoomLog.objects.all()
    serializer_class = StudentClassRoomLogSerializer
    permission_classes = [AllowAny]

    # if the student is allowed to access the classroom, log it in the database if not, do nothing
    def create(self, request, *args, **kwargs):
        student = request.data['rfid']
        classroom = request.data['classroom']
        student_classroom = StudentClassRoom.objects.filter(student=student, classroom=classroom)
        if student_classroom:
            if student_classroom[0].can_access:
                return super().create(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)


class ListAllStudentsInClassRoom(generics.ListAPIView):
    serializer_class = StudentClassRoomSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        classroom = self.kwargs['classroom']
        student_classroom = StudentClassRoom.objects.filter(classroom=classroom)
        return student_classroom


class UpdateStudentClassRoomStatus(generics.UpdateAPIView):
    serializer_class = StudentClassRoomSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        student_rfid = request.data['studentRFID']
        student = Student.objects.filter(rfid=student_rfid)[0]
        if not student:
            return Response(status=status.HTTP_204_NO_CONTENT)
        classroom = request.data['classroom']
        if not classroom:
            return Response(status=status.HTTP_204_NO_CONTENT)
        student_classroom = StudentClassRoom.objects.filter(student=student, classroom=classroom)
        # if there is no student_classroom object, then return message that this student is not in this classroom
        if not student_classroom:
            return Response(status=status.HTTP_204_NO_CONTENT)
        if student_classroom:
            student_classroom = student_classroom[0]
            # the new status is the opposite of the current status
            student_classroom.is_in_classroom = not student_classroom.is_in_classroom
            student_classroom.save()
            # log the event
            now = datetime.now()
            student_classroom_log = StudentClassRoomLog(student=student, classroom_id=classroom, created_at=now)
            student_classroom_log.save()
            return Response(status=status.HTTP_200_OK, data=StudentClassRoomSerializer(student_classroom).data)
        return Response(status=status.HTTP_400_BAD_REQUEST)