package com.solucius.solucius.model;

public interface ResQnaDetail {
    int getQnaDetailIdx();
    String getContents();

    int getQnaIdx();
    int getUserIdx();
    String getAskField();
    boolean getScrap();
    // private Date createDt;
    // private Date endDt;

    String getImgUrl();
}
