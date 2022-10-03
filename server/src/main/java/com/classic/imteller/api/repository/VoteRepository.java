package com.classic.imteller.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByArtIdAndIsVoting(long artId, int isVoting);

    Optional<Vote> findByArtIdAndIsVoting(long artId, int isVoting);
}
