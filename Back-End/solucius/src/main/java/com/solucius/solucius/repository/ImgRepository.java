package com.solucius.solucius.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.solucius.solucius.model.Img;

@Repository
public interface ImgRepository extends JpaRepository<Img, Integer> {

    Img findByQnaIdx(int qnaIdx);

}
