package com.studentTracker.demo.dto;




import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnalyticsResponse {

    private long totalApplications;

    private long totalOffers;

    private long totalRejected;

    private long totalInterviews;

    private double successRate;

    private double interviewRate;

    private String insight;
}