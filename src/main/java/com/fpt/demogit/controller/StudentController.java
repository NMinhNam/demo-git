package com.fpt.demogit.controller;

import com.fpt.demogit.entity.Student;
import com.fpt.demogit.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    @Autowired
    StudentService studentService;

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAll();
    }

    @GetMapping("/{id}")
    public List<Student> getStudentById(@PathVariable("id") String studentId) {
        return studentService.getByStudentId(studentId);
    }

    @PostMapping
    public int saveStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @DeleteMapping("/{id}")
    public int addStudent(@PathVariable("id") String studentId) {
        return studentService.deleteStudent(studentId);
    }
}
