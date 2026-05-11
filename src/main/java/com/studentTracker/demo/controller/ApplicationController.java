package com.studentTracker.demo.controller;




import com.studentTracker.demo.dto.ApplicationRequest;
import com.studentTracker.demo.dto.ApplicationStatusRequest;
import com.studentTracker.demo.entity.Application;
import com.studentTracker.demo.entity.ApplicationStatus;
import com.studentTracker.demo.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService service;

    @PostMapping
    public Application create(@RequestBody ApplicationRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<Application> getAll() {
        return service.getAll();
    }



    @GetMapping("/filter")
    public List<Application> filterByStatus(
            @RequestParam ApplicationStatus status
    ) {
        return service.filterByStatus(status);
    }

    @GetMapping("/search")
    public List<Application> searchCompany(
            @RequestParam String company
    ) {
        return service.searchCompany(company);
    }

    @PutMapping("/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestBody ApplicationStatusRequest request
    ) {

        return service.updateStatus(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        service.delete(id);
    }

    @PutMapping("/{id}")
    public Application update(
            @PathVariable Long id,
            @RequestBody ApplicationRequest request
    ) {

        return service.update(id, request);
    }
}