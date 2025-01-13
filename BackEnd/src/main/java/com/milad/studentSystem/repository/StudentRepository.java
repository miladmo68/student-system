package com.milad.studentSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.milad.studentSystem.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student , Integer> {

}
