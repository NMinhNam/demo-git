package com.fpt.demogit.service;

import com.fpt.demogit.entity.Student;

import java.util.List;

public interface StudentService {
    List<Student> getAll();

    List<Student> getByName(String studentName);
}
