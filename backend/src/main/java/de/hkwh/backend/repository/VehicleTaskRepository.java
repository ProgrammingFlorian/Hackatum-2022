package de.hkwh.backend.repository;

import de.hkwh.backend.model.VehicleTask;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VehicleTaskRepository extends CrudRepository <VehicleTask, Long>{

    @Query(
            value = "Select * From vehicle_task WHERE fulfilled < 1",
            nativeQuery = true
    )
    Optional<List<VehicleTask>> findAllUnFullFilled();

    @Query(
            value = "Select * From vehicle_task WHERE vta_id = :vta_id",
            nativeQuery = true
    )
    Optional<VehicleTask> findByVta_id(@Param("vta_id") long vta_id);
}
