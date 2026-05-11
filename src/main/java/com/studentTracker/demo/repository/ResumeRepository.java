package com.studentTracker.demo.repository;



import com.studentTracker.demo.entity.Resume;
import com.studentTracker.demo.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {

    List<Resume> findByUser(User user);

    int countByUser(User user);
}