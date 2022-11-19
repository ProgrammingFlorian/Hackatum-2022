package de.hkwh.backend.repository;

import de.hkwh.backend.model.BookedVehicle;
import org.springframework.data.repository.CrudRepository;

public interface BookedVehicleRepository extends CrudRepository <BookedVehicle, Long>{

    @Override
    Iterable<BookedVehicle> findAll();
}
