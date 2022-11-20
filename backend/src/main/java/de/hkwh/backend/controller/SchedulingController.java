package de.hkwh.backend.controller;

import de.hkwh.backend.datatransferobjects.DashboardDTO;
import de.hkwh.backend.datatransferobjects.TaskDTO;
import de.hkwh.backend.datatransferobjects.WallboxDTO;
import de.hkwh.backend.service.SchedulingService;
import de.hkwh.backend.service.RessourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    private final SchedulingService scheduler;
    private final RessourceService ressourceService;
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> getDashboard() {
        TaskDTO[] tasks = scheduler.getTasks();
        //WallboxDTO[] wallboxes = ressourceService.getWallboxes();
        WallboxDTO[] wallboxes = scheduler.getWallBoxes();
        return new ResponseEntity<>(DashboardDTO.of(wallboxes, tasks), HttpStatus.OK);
    }

}
