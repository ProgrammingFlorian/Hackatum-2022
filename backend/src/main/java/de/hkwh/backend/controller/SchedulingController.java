package de.hkwh.backend.controller;

import de.hkwh.backend.datatransferobjects.DashboardDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SchedulingController {

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> getDashboard() {

        return null;
    }

}
