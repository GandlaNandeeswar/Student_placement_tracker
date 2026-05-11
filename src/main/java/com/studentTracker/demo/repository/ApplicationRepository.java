package com.studentTracker.demo.repository;



import com.studentTracker.demo.entity.Application;
import com.studentTracker.demo.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import com.studentTracker.demo.entity.User;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStatus(ApplicationStatus status);

    List<Application> findByCompanyNameContainingIgnoreCase(String companyName);

    List<Application> findByUser(User user);

    long countByStatus(ApplicationStatus status);
}
