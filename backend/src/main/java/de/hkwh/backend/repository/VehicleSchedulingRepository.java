package de.hkwh.backend.repository;

import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.model.VehicleScheduling;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ScheduledExecutorService;

public interface VehicleSchedulingRepository extends CrudRepository <VehicleScheduling, Long>{

    @Query(
            value = "select * form vehicle_scheduling where p_id = :p_id",
            nativeQuery = true
    )
    public Optional<List<VehicleScheduling>> getAllSchedulesByP_id(@Param("p_id")long p_id);
}
