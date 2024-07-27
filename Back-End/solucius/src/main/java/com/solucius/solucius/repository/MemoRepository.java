package com.solucius.solucius.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.solucius.solucius.model.Memo;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Integer> {

    @Transactional
    @Query(value = "SELECT m.* " + 
                    "FROM memo m INNER JOIN qna q ON m.qna_idx = q.qna_idx " +
                    "WHERE q.user_idx = :userIdx", nativeQuery = true)
    List<Memo> findAllByQnaUserIdx(int userIdx);
    
}
