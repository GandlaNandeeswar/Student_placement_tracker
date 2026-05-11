package com.studentTracker.demo.service;



import com.studentTracker.demo.entity.Resume;
import com.studentTracker.demo.entity.User;
import com.studentTracker.demo.repository.ResumeRepository;
import com.studentTracker.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository repository;

    private final UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/";

    private User getCurrentUser() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = auth.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow();
    }

    public Resume uploadResume(
            MultipartFile file
    ) throws IOException {

        if (
                !file.getContentType()
                        .equals("application/pdf")
        ) {

            throw new RuntimeException(
                    "Only PDF allowed"
            );
        }

        User user = getCurrentUser();

        int version =
                repository.countByUser(user) + 1;

        String fileName =
                "resume_v"
                        + version
                        + "_"
                        + file.getOriginalFilename();

        Path path =
                Paths.get(UPLOAD_DIR + fileName);

        Files.createDirectories(path.getParent());

        Files.write(path, file.getBytes());

        Resume resume =
                Resume.builder()

                        .fileName(fileName)

                        .filePath(path.toString())

                        .versionNumber(version)

                        .uploadedAt(LocalDateTime.now())

                        .user(user)

                        .build();

        return repository.save(resume);
    }

    public List<Resume> getUserResumes() {

        User user = getCurrentUser();

        return repository.findByUser(user);
    }
}