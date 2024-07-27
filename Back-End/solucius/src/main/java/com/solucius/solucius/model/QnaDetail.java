package com.solucius.solucius.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder // object 생성을 위한 디자인 패턴
@NoArgsConstructor // 매개변수가 없는 생성자를 구현해줌
@AllArgsConstructor // 모든 멤버변수를 매개변수로 받는 생성자를 구현
@Data
@Entity
public class QnaDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qnaDetailIdx;

    private int qnaIdx;
    private String contents;
    private Date createDt;
}
