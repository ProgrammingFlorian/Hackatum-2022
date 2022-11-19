package de.hkwh.backend.controller;

import de.hkwh.backend.datatransferobjects.TaskDTO;
import de.hkwh.backend.service.SchedulingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final SchedulingService scheduler;
    @GetMapping("/tasks")
    public ResponseEntity<TaskDTO[]> getTasks() {
        return new ResponseEntity<>(scheduler.getTasks(), HttpStatus.OK);
    }

    @PostMapping("/task/fullfilled/{vta_id}")
    public ResponseEntity<TaskDTO> fullFillTask(@PathVariable long vta_id)
    {
        return new ResponseEntity<>(scheduler.fullFillTask(vta_id), HttpStatus.OK);
    }



}
