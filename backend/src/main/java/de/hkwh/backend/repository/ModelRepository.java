package de.hkwh.backend.repository;

import de.hkwh.backend.model.Model;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ModelRepository extends CrudRepository <Model, Long>{

    @Override
    Iterable<Model> findAll();

    @Query(
            value = "Select * From model WHERE m_id = :m_id",
            nativeQuery = true
    )
    Optional<Model> findByM_id(@Param("m_id") long m_id);
}
