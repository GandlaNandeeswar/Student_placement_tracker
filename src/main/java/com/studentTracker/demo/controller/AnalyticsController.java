package com.studentTracker.demo.controller;



import com.studentTracker.demo.entity.Application;
import com.studentTracker.demo.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    private final ApplicationRepository repository;

    @GetMapping
    public Map<String, Object> getAnalytics() {

        List<Application> apps = repository.findAll();

        long total = apps.size();

        long interviews = apps.stream()
                .filter(a -> a.getStatus().name().equalsIgnoreCase("INTERVIEW"))
                .count();

        long offers = apps.stream()
                .filter(a -> a.getStatus().name().equalsIgnoreCase("OFFER"))
                .count();

        long rejected = apps.stream()
                .filter(a -> a.getStatus().name().equalsIgnoreCase("REJECTED"))
                .count();

        long applied = apps.stream()
                .filter(a -> a.getStatus().name().equalsIgnoreCase("APPLIED"))
                .count();

        double successRate = total == 0
                ? 0
                : ((double) offers / total) * 100;

        Map<String, Object> data = new HashMap<>();

        data.put("total", total);
        data.put("interviews", interviews);
        data.put("offers", offers);
        data.put("rejected", rejected);
        data.put("applied", applied);
        data.put("successRate", successRate);

        /* PIE CHART DATA */

        List<Map<String, Object>> statusData = List.of(

                Map.of(
                        "name", "Applied",
                        "value", applied
                ),

                Map.of(
                        "name", "Interview",
                        "value", interviews
                ),

                Map.of(
                        "name", "Offers",
                        "value", offers
                ),

                Map.of(
                        "name", "Rejected",
                        "value", rejected
                )
        );

        data.put("statusData", statusData);

        /* WEEKLY BAR DATA */

        List<Map<String, Object>> weeklyData = List.of(

                Map.of(
                        "name", "Week 1",
                        "value", applied
                ),

                Map.of(
                        "name", "Week 2",
                        "value", interviews
                ),

                Map.of(
                        "name", "Week 3",
                        "value", offers
                ),

                Map.of(
                        "name", "Week 4",
                        "value", rejected
                )
        );

        data.put("weeklyData", weeklyData);

        return data;
    }
}

