package de.hkwh.backend.repository;

import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.model.VehicleTicket;
import org.springframework.data.repository.CrudRepository;

public interface VehicleTicketRepository extends CrudRepository <VehicleTicket, Long>{

}
