package com.fpt.demogit.mapper;

import com.fpt.demogit.entity.Student;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StudentMapper {
    final String getAll = "SELECT * FROM student";
    final String getByName = "SELECT * FROM student WHERE name = #{name}";

    @Select(getAll)
    @Results(value = {
            @Result(property = "id", column = "id"),
            @Result(property = "name", column = "name"),
            @Result(property = "age", column = "age"),
            @Result(property = "phone", column = "phone"),
            @Result(property = "email", column = "email")
    })
    List<Student> getAll();

    @Select(getByName)
    @Results(value = {
            @Result(property = "id", column = "id"),
            @Result(property = "name", column = "name"),
            @Result(property = "age", column = "age"),
            @Result(property = "phone", column = "phone"),
            @Result(property = "email", column = "email")
    })
    List<Student> getByName(String name);
}
