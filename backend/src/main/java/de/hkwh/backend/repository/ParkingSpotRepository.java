package de.hkwh.backend.repository;

import de.hkwh.backend.model.Parkingspot;
import de.hkwh.backend.model.Vehicle;
import org.springframework.data.repository.CrudRepository;

public interface ParkingSpotRepository extends CrudRepository <Parkingspot, Long>{

}
