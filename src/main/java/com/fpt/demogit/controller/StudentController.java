package com.fpt.demogit.controller;

import com.fpt.demogit.entity.Student;
import com.fpt.demogit.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAll();
    }

    @GetMapping("/{name}")
    public List<Student> getStudentByName(@PathVariable String name) {
        return studentService.getByName(name);
    }
}
