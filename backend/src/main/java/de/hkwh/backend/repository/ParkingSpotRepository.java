package de.hkwh.backend.repository;

import de.hkwh.backend.model.Parkingspot;
import de.hkwh.backend.model.Vehicle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ParkingSpotRepository extends CrudRepository <Parkingspot, Long>{

    //Optional<List<Parkingspot>> findAllByFreeTrue();

    @Query(
        value = "Select * From parking_spot WHERE is_free >= 1 LIMIT 1",
        nativeQuery = true
    )
    Optional<Parkingspot> findFirstFree();
}
