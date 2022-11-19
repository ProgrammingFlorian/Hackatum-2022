package de.hkwh.backend.repository;

import de.hkwh.backend.model.Model;
import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.model.VehicleTicket;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface VehicleTicketRepository extends CrudRepository <VehicleTicket, Long>{

    @Query(
            value = "Select * From vehicle_ticket WHERE v_id = :v_id",
            nativeQuery = true
    )
    Optional<VehicleTicket> findByV_id(@Param("v_id")long v_id);

}
