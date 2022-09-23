package com.classic.imteller.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArtRepository extends JpaRepository<Art, Integer> {
    @Query(value="SELECT * FROM Art WHERE owner_id = :email AND isNFT IS NOT NULL", nativeQuery = true)
    List<Art> findAllByEmailAndIsNFT(@Param("email") String email);

    @Query(value="SELECT * FROM Art WHERE owner_id = :email AND isNFT IS NULL", nativeQuery = true)
    List<Art> findAllByEmailAndIsPaint(@Param("email") String email);

    Optional<Art> findById(Long id);

    void deleteById(Long id);
}