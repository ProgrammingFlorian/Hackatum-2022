package de.hkwh.backend.repository;

import de.hkwh.backend.model.Vehicle;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends CrudRepository <Vehicle, Long>{

    @Override
    Iterable<Vehicle> findAll();
}
