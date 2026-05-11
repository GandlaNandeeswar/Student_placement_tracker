package com.studentTracker.demo.service;



import com.studentTracker.demo.dto.AnalyticsResponse;
import com.studentTracker.demo.entity.ApplicationStatus;
import com.studentTracker.demo.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ApplicationRepository repository;

    public AnalyticsResponse getAnalytics() {

        long total = repository.count();

        long offers = repository.countByStatus(ApplicationStatus.OFFER);

        long rejected = repository.countByStatus(ApplicationStatus.REJECTED);

        long interviews = repository.countByStatus(ApplicationStatus.INTERVIEW);

        double successRate = 0;

        double interviewRate = 0;

        if (total > 0) {
            successRate = ((double) offers / total) * 100;

            interviewRate = ((double) interviews / total) * 100;
        }

        String insight;

        if (offers > 0) {
            insight = "Great progress! You are getting offers.";
        } else if (interviews > 3) {
            insight = "You are getting interviews. Improve final rounds.";
        } else if (total < 5) {
            insight = "Apply to more companies to improve opportunities.";
        } else {
            insight = "Keep improving your preparation and consistency.";
        }

        return AnalyticsResponse.builder()
                .totalApplications(total)
                .totalOffers(offers)
                .totalRejected(rejected)
                .totalInterviews(interviews)
                .successRate(successRate)
                .interviewRate(interviewRate)
                .insight(insight)
                .build();
    }
}