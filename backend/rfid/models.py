from django.db import models


# Create your models here.


class Student(models.Model):
    rfid = models.CharField(max_length=200, unique=True, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name


class ClassRoom(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class StudentClassRoom(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    is_in_classroom = models.BooleanField(default=False)

    def __str__(self):
        return self.student.name + ' - ' + self.classroom.name


class StudentClassRoomLog(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.student.name + ' - ' + self.classroom.name + ' - ' + str(self.created_at)
