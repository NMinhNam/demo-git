package com.fpt.demogit.mapper;

import com.fpt.demogit.entity.Student;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StudentMapper {
    String getAll = "SELECT id, student_id, name, age, phone, email FROM student";
    String getByName = "SELECT id, student_id, name, age, phone, email FROM student WHERE student_id = #{studentId}";
    String insert = "INSERT INTO student (name, student_id, age, phone, email) VALUES (#{name}, #{studentId}, #{age}, #{phone}, #{email})";
    String update = "UPDATE student SET name = #{name} WHERE student_id = #{studentId}";
    String deleteByStudentId = "DELETE FROM student WHERE student_id = #{studentId}";

    @Select(getAll)
    @Results(value = {
            @Result(property = "id", column = "id"),
            @Result(property = "studentId", column = "student_id"),
            @Result(property = "name", column = "name"),
            @Result(property = "age", column = "age"),
            @Result(property = "phone", column = "phone"),
            @Result(property = "email", column = "email")
    })
    List<Student> getAll();

    @Select(getByName)
    @Results(value = {
            @Result(property = "id", column = "id"),
            @Result(property = "studentId", column = "student_id"),
            @Result(property = "name", column = "name"),
            @Result(property = "age", column = "age"),
            @Result(property = "phone", column = "phone"),
            @Result(property = "email", column = "email")
    })
    List<Student> getByStudentId(String studentId);

    @Update(update)
    int update(Student student);

    @Delete(deleteByStudentId)
    int delete(String studentId);

    @Insert(insert)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Student student);
}
