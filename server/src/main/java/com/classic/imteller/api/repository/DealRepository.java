package com.classic.imteller.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {

    @Query("select d, a from Deal d left join d.art a where a.title like %:title%")
    List<Deal> searchByCardTitleLike(String title);

    @Query(value = "SELECT * FROM deal d " +
            "LEFT JOIN art a ON a.id = d.art_id " +
            "LEFT JOIN user u ON u.id = a.designer_id " +
            "WHERE u.nickname like %:nickname%",
        nativeQuery = true)
    List<Deal> searchByCardDesignerLike(String nickname);


    @Query(value = "SELECT * FROM deal d " +
            "LEFT JOIN art a ON a.id = d.art_id " +
            "LEFT JOIN user u ON u.id = a.owner_id " +
            "WHERE u.nickname like %:nickname%",
            nativeQuery = true)
    List<Deal> searchByCardOwnerLike(String nickname);


}
