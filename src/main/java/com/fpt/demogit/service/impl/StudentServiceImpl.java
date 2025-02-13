package com.fpt.demogit.service.impl;

import com.fpt.demogit.entity.Student;
import com.fpt.demogit.mapper.StudentMapper;
import com.fpt.demogit.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentMapper studentMapper;

    @Override
    public List<Student> getAll() {
        return studentMapper.getAll();
    }

    @Override
    public List<Student> getByName(String name) {
        return studentMapper.getByName(name);
    }
}
