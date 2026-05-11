package com.studentTracker.demo.controller;




import com.studentTracker.demo.entity.Resume;
import com.studentTracker.demo.service.ResumeService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

import java.util.List;

@RestController
@RequestMapping("/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService service;

    @PostMapping("/upload")
    public Resume upload(
            @RequestParam("file")
            MultipartFile file
    ) throws IOException {

        return service.uploadResume(file);
    }

    @GetMapping
    public List<Resume> getResumes() {

        return service.getUserResumes();
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<byte[]> download(
            @PathVariable String fileName
    ) throws IOException {

        Path path =
                Paths.get("uploads/" + fileName);

        byte[] file =
                Files.readAllBytes(path);

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename="
                                + fileName
                )

                .contentType(
                        MediaType.APPLICATION_PDF
                )

                .body(file);
    }
}
