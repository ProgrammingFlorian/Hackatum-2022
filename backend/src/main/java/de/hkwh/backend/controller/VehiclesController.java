package de.hkwh.backend.controller;

import de.hkwh.backend.datatransferobjects.VehicleDTO;
import de.hkwh.backend.service.RessourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VehiclesController {

    private final RessourceService ressourceService;

    /**
     * GET /vehicle
     *
     * @return the list of all Vehicles in the database
     */
    @GetMapping("/vehicles")
    public ResponseEntity<VehicleDTO[]> getVehicles() {
        return new ResponseEntity<>(ressourceService.getVehicles(), HttpStatus.OK);
    }

    @GetMapping("/vehicle/license/{plate}")
    public ResponseEntity<VehicleDTO> getVehicle(@PathVariable String plate)
    {
        return new ResponseEntity<>(ressourceService.getVehicle(plate), HttpStatus.OK);
    }

    @GetMapping("/vehicle/v_id/{id}")
    public ResponseEntity<VehicleDTO> getVehicle(@PathVariable long id)
    {
        return new ResponseEntity<>(ressourceService.getVehicle(id), HttpStatus.OK);
    }

    @PostMapping("/vehicle/checkin/{plate}/{hub}")
    public ResponseEntity<VehicleDTO> checkInVehicle(@PathVariable String plate, @PathVariable long hub)
    {
        return new ResponseEntity<>(ressourceService.checkIn(plate, hub), HttpStatus.OK);
    }

    @PostMapping("/vehicle/checkout/{plate}")
    public ResponseEntity<VehicleDTO> checkOutVehicle(@PathVariable String plate)
    {
        return null;
    }
}

