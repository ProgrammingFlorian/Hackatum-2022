package de.hkwh.backend.repository;

import de.hkwh.backend.model.Hub;
import de.hkwh.backend.model.Model;
import de.hkwh.backend.model.Parkingspot;
import de.hkwh.backend.model.Vehicle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface HubRepository extends CrudRepository <Hub, Long>{

    Optional<Hub> findByHubName(String hubName);

    @Query(
            value = "Select * From hub WHERE h_id = :h_id",
            nativeQuery = true
    )
    Optional<Hub> findByH_id(@Param("h_id") long h_id);

    @Query(
            value = "Select * From hub LIMIT 1",
            nativeQuery = true
    )
    Optional<Hub> findFirst();
}
