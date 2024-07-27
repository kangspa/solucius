package com.solucius.solucius.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder // object 생성을 위한 디자인 패턴
@NoArgsConstructor // 매개변수가 없는 생성자를 구현해줌
@AllArgsConstructor // 모든 멤버변수를 매개변수로 받는 생성자를 구현
@Data
public class ResQna {
    private int qnaIdx;
    private int userIdx;
    private String askField;
    private boolean scrap;
    private Date createDt;
    private Date endDt;
    
    private String url;

    private String contents;
    private String isDetail;
}
