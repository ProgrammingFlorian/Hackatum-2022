package de.hkwh.backend.repository;

import de.hkwh.backend.model.Model;
import org.springframework.data.repository.CrudRepository;

public interface ModelRepository extends CrudRepository <Model, Long>{

    @Override
    Iterable<Model> findAll();
}
