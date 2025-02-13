package com.fpt.demogit.service;

import com.fpt.demogit.entity.Student;

import java.util.List;

public interface StudentService {
    List<Student> getAll();

    List<Student> getByStudentId(String studentId);

    int addStudent(Student student);

    int updateStudent(Student student);

    int deleteStudent(String studentId);
}
