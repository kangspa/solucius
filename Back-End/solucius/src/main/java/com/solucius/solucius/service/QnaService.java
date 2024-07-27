package com.solucius.solucius.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.solucius.solucius.aws.S3Service;
import com.solucius.solucius.model.Img;
import com.solucius.solucius.model.Qna;
import com.solucius.solucius.model.QnaDetail;
import com.solucius.solucius.model.ResQna;
import com.solucius.solucius.model.ResQnaDetail;
import com.solucius.solucius.model.ResQnaJpa;
import com.solucius.solucius.repository.ImgRepository;
import com.solucius.solucius.repository.QnaDetailRepository;
import com.solucius.solucius.repository.QnaRepository;

@Service
public class QnaService {

    @Autowired private QnaRepository qnaRepository;
    @Autowired private ImgRepository imgRepository;
    @Autowired private QnaDetailRepository qnaDetailRepository;
    @Autowired private S3Service s3Service;

    public List<ResQnaJpa> findAllWithUrlByUserIdx(int userIdx) {
        return qnaRepository.findAllWithUrlByUserIdx(userIdx);
    }

    @Transactional
    public Qna question(MultipartFile file, int userIdx, String askField, String imgType) {
        // img테이블에 이미지저장 + qna테이블에 저장
        Qna qna = qnaRepository.save(
            Qna.builder()
                .userIdx(userIdx)
                .askField(askField)
                .imgType(imgType)
                .scrap(false)
                .build());

        Img res = s3Service.upload(file);
        res.setQnaIdx(qna.getQnaIdx());
        imgRepository.save(res);

        return qna;
    }

    public ResQna questionResult(int qnaIdx) {
        
        Qna qna = qnaRepository.findByQnaIdx(qnaIdx);
        String url = imgRepository.findByQnaIdx(qnaIdx).getImgUrl();
        QnaDetail qnaDetail = qnaDetailRepository.findByQnaIdx(qnaIdx);
        String isDetail = (qnaDetail != null) ? "TRUE" : "FALSE";
        String contents = (qnaDetail != null) ? qnaDetail.getContents() : "";

        return ResQna.builder()
            .qnaIdx(qna.getQnaIdx())
            .userIdx(qna.getUserIdx())
            .askField(qna.getAskField())
            .scrap(qna.isScrap())
            .endDt(qna.getEndDt())
            .createDt(qna.getCreateDt())
            .url(url)
            .contents(contents)
            .isDetail(isDetail)
            .build();
    }

    public QnaDetail save(QnaDetail request) {
        return qnaDetailRepository.save(request);
    }

    public int updateChat(QnaDetail request) {
        return qnaDetailRepository.updateChat(request.getQnaIdx(), request.getContents());
    }

    public ResQnaDetail selectQnaDetail(int qnaIdx) {
        return qnaDetailRepository.selectQnaDetail(qnaIdx);
    }

}
