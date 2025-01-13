package com.milad.studentSystem.service;

import java.util.List;

import com.milad.studentSystem.model.Student;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
