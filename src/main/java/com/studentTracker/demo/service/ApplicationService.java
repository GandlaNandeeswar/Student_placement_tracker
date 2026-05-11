package com.studentTracker.demo.service;



import com.studentTracker.demo.dto.ApplicationRequest;
import com.studentTracker.demo.dto.ApplicationStatusRequest;
import com.studentTracker.demo.entity.Application;
import com.studentTracker.demo.entity.ApplicationStatus;
import com.studentTracker.demo.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.studentTracker.demo.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;




import com.studentTracker.demo.entity.User;




import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository repository;
    private final UserRepository userRepository;

    public Application create(
            ApplicationRequest request
    ) {

        User user = getCurrentUser();

        Application app =
                Application.builder()

                        .companyName(
                                request.getCompanyName()
                        )

                        .role(
                                request.getRole()
                        )

                        .status(
                                request.getStatus()
                        )

                        .notes(
                                request.getNotes()
                        )

                        .resumeLink(
                                request.getResumeLink()
                        )

                        .user(user)

                        .build();

        return repository.save(app);
    }

    public List<Application> getAll() {

        User user = getCurrentUser();

        return repository.findByUser(user);
    }

    public Application updateStatus(Long id, ApplicationStatus status) {

        Application application = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);

        return repository.save(application);
    }

    public List<Application> filterByStatus(ApplicationStatus status) {
        return repository.findByStatus(status);
    }

    public List<Application> searchCompany(String company) {
        return repository.findByCompanyNameContainingIgnoreCase(company);
    }

    public Application updateStatus(
            Long id,
            ApplicationStatusRequest request
    ) {

        Application app =
                repository.findById(id)
                        .orElseThrow();

        app.setStatus(
                ApplicationStatus.valueOf(request.getStatus())
        );

        return repository.save(app);
    }

    public void delete(Long id) {

        repository.deleteById(id);
    }

    public Application update(Long id, ApplicationRequest request) {

        Application app = repository.findById(id)
                .orElseThrow();

        app.setCompanyName(request.getCompanyName());
        app.setRole(request.getRole());
        app.setStatus(request.getStatus());
        app.setNotes(request.getNotes());
        app.setResumeLink(request.getResumeLink());

        return repository.save(app);
    }
    private User getCurrentUser() {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null ||
                    authentication.getName() == null ||
                    authentication.getName().equals("anonymousUser")) {

                return userRepository.findAll().stream().findFirst().orElse(null);
            }

            String email = authentication.getName();

            return userRepository
                    .findByEmail(email)
                    .orElseGet(() ->
                            userRepository.findAll().stream().findFirst().orElse(null)
                    );

        } catch (Exception e) {

            return userRepository.findAll().stream().findFirst().orElse(null);
        }
    }
}
