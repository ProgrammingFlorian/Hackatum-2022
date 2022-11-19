package de.hkwh.backend.repository;

import de.hkwh.backend.model.Hub;
import de.hkwh.backend.model.Vehicle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends CrudRepository <Vehicle, Long>{

    Iterable<Vehicle> findAll();

    Optional<Vehicle> findByLicensePlate(String licensePlate);

    @Query(
            value = "Select * From vehicle WHERE v_id = :v_id",
            nativeQuery = true
    )
    Optional<Vehicle> findByV_id(@Param("v_id") long v_id);

}
