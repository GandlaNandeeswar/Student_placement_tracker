package com.studentTracker.demo.entity;




import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String role;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    private LocalDate appliedDate;

    @Column(length = 2000)
    private String notes;

    private String resumeLink;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
