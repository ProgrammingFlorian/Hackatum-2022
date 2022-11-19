package de.hkwh.backend.controller;

import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VehiclesController {

    // private final VehicleService vehicleService;

    /**
     * GET /vehicle
     *
     * @return the list of all Vehicles in the database
     */
    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getVehicles() {
        return new ResponseEntity<>(VehicleService.getVehicles(), HttpStatus.OK);

    }
}

