package com.fpt.demogit.entity;

public class Student {
    private Long id;

    private String studentId;

    private String name;

    private int age;

    private String phone;

    private String email;

    public Student() {
    }

    public Student(Long id, String studentId, String name, int age, String phone, String email) {
        this.id = id;
        this.studentId = studentId;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
