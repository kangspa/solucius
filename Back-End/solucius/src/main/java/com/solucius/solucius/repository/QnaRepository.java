package com.solucius.solucius.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.solucius.solucius.model.Qna;
import com.solucius.solucius.model.ResQnaJpa;
@Repository
public interface QnaRepository extends JpaRepository<Qna, Integer> {
    
    Qna findByQnaIdx(int qnaIdx);
    
    @Transactional
    @Query(value = "SELECT q.qna_idx as qnaIdx, " + 
                    "q.user_idx as userIdx, " +
                    "q.ask_field as askField, " + 
                    "q.scrap as scrap, " +
                    "i.img_url as imgUrl " +
                    "FROM qna q JOIN img i ON q.qna_idx = i.qna_idx " +
                    "WHERE q.user_idx = :userIdx", nativeQuery = true)
    List<ResQnaJpa> findAllWithUrlByUserIdx(int userIdx);

}
