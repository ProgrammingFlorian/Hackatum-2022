package de.hkwh.backend.repository;

import de.hkwh.backend.model.VehicleTicket;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VehicleTicketRepository extends CrudRepository <VehicleTicket, Long>{

    @Query(
            value = "Select * From vehicle_ticket WHERE v_id = :v_id AND is_active >= 1",
            nativeQuery = true
    )
    Optional<VehicleTicket> findByV_id(@Param("v_id")long v_id);

    @Query(
            value = "Select * From vehicle_ticket WHERE vt_id = :vt_id",
            nativeQuery = true
    )
    Optional<VehicleTicket> findByVt_id(@Param("vt_id")long vt_id);

    @Query(
            value = "Select * from vehicle_ticket Where v_id = :v_id",
            nativeQuery = true
    )
    Optional<List<VehicleTicket>> getAllTicketsByV_id(@Param("v_id") long v_id);
}
