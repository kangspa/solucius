package com.solucius.solucius.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.solucius.solucius.model.QnaDetail;
import com.solucius.solucius.model.ResQnaDetail;

@Repository
public interface QnaDetailRepository extends JpaRepository<QnaDetail, Integer> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE qna_detail SET contents = :contents WHERE qna_idx = :qnaIdx", nativeQuery = true)
    int updateChat(@Param("qnaIdx") int qnaIdx, @Param("contents") String contents);
    
    @Transactional
    @Query(value = "SELECT a.qna_idx as qnaIdx, a.user_idx as userIdx, a.ask_field as askField, a.scrap as scrap, " + 
                    "b.qna_detail_idx as qnaDetailIdx, b.contents as contents, i.img_url as imgUrl " + 
                    "FROM qna a JOIN qna_detail b ON a.qna_idx = b.qna_idx " + 
                    "JOIN Img i ON a.qna_idx = i.qna_idx WHERE a.qna_idx = :qnaIdx", nativeQuery = true)
    ResQnaDetail selectQnaDetail(@Param("qnaIdx") int qnaIdx);

    QnaDetail findByQnaIdx(int qnaIdx);
}
