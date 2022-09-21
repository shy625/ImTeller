package com.classic.imteller.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtRepository extends JpaRepository<Art, Integer> {
    @Query(value="SELECT * FROM Art WHERE owner_id = :email AND isNFT IS NOT NULL", nativeQuery = true)
    List<Art> findAllByEmailAndIsNFT(@Param("email") String email);
}