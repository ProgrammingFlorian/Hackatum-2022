package de.hkwh.backend.repository;

import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.model.VehicleTask;
import org.springframework.data.repository.CrudRepository;

public interface VehicleTaskRepository extends CrudRepository <VehicleTask, Long>{

}
