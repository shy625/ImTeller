package com.classic.imteller.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EffectRepository extends JpaRepository<Effect, Integer> {
    Effect findByEffectId(String effect_id);
}
