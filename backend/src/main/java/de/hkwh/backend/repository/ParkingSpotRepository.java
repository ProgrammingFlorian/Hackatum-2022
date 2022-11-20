package de.hkwh.backend.repository;

import de.hkwh.backend.model.Parkingspot;
import de.hkwh.backend.model.Vehicle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ParkingSpotRepository extends CrudRepository <Parkingspot, Long>{


    @Query(
        value = "Select * From parking_spot WHERE is_free >= 1 LIMIT 1",
        nativeQuery = true
    )
    Optional<Parkingspot> findFirstFree();

    @Query(
            value = "Select * From parking_spot WHERE has_wallbox >= 1",
            nativeQuery = true
    )
    Optional<List<Parkingspot>> findWallboxes();

    @Query(
            value = "Select * From parking_spot WHERE p_id = :p_id",
            nativeQuery = true
    )
    Optional<Parkingspot> fincByP_id(@Param("p_id")long p_id);
}
