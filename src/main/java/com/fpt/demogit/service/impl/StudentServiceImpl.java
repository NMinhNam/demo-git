package com.fpt.demogit.service.impl;

import com.fpt.demogit.entity.Student;
import com.fpt.demogit.mapper.StudentMapper;
import com.fpt.demogit.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentMapper studentMapper;

    @Override
    public List<Student> getAll() {
        return studentMapper.getAll();
    }

    @Override
    public List<Student> getByStudentId(String getByStudentId) {
        return studentMapper.getByStudentId(getByStudentId);
    }

    @Override
    public int saveStudent(Student student) {
        String studentId = student.getStudentId();
        boolean isExistedStudent = studentMapper.isExistedStudent(studentId);
        if (isExistedStudent) {
            return studentMapper.update(student);
        }
        return studentMapper.insert(student);
    }

    @Override
    public int deleteStudent(String studentId) {
        return studentMapper.delete(studentId);
    }
}
