from .models import Student, ClassRoom, StudentClassRoom, StudentClassRoomLog
from rest_framework import serializers


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'rfid', 'name')


class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ('id', 'name')


class StudentClassRoomSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.name')
    classroom_name = serializers.ReadOnlyField(source='classroom.name')
    student_rfid = serializers.ReadOnlyField(source='student.rfid')

    class Meta:
        model = StudentClassRoom
        fields = ('id', 'student', 'classroom', 'is_in_classroom', 'student_name', 'classroom_name', 'student_rfid')



class StudentClassRoomLogSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    classroom = ClassRoomSerializer()

    class Meta:
        model = StudentClassRoomLog
        fields = ('id', 'student', 'classroom', 'created_at')
