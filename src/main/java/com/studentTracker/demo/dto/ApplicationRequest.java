package com.studentTracker.demo.dto;





import com.studentTracker.demo.entity.ApplicationStatus;
import lombok.Data;

@Data
public class ApplicationRequest {

    private String companyName;

    private String role;

    private ApplicationStatus status;

    private String notes;

    private String resumeLink;
}