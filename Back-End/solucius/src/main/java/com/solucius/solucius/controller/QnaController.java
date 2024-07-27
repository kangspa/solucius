package com.solucius.solucius.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.solucius.solucius.model.Qna;
import com.solucius.solucius.model.QnaDetail;
import com.solucius.solucius.model.ResQna;
import com.solucius.solucius.model.ResQnaDetail;
import com.solucius.solucius.model.ResQnaJpa;
import com.solucius.solucius.service.QnaService;

@RestController
public class QnaController {
    
    @Autowired
    private QnaService service;

    @GetMapping("/getQnaList")
    public ResponseEntity<List<ResQnaJpa>> findAllWithUrlByUserIdx(@RequestParam int userIdx) {
        List<ResQnaJpa> list = service.findAllWithUrlByUserIdx(userIdx);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/question")
    public ResponseEntity<Qna> question(
        @RequestParam("file") MultipartFile file,
        @RequestParam("userIdx") int userIdx,
        @RequestParam("askField") String askField,
        @RequestParam("imgType") String imgType) {

        Qna qna = new Qna();

        if(!file.isEmpty() && userIdx > 0) {
            qna = service.question(file, userIdx, askField, imgType);
        }

        if (qna != null) {
            return ResponseEntity.ok(qna);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/questionResult")
    public ResponseEntity<ResQna> questionResult(@RequestParam int qnaIdx) {
        if (qnaIdx > 0) {
            
            ResQna qna = service.questionResult(qnaIdx);

            if (qna != null) {
                return ResponseEntity.ok(qna);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/saveAnswer")
    public ResponseEntity<QnaDetail> saveAnswer(@RequestBody QnaDetail request) {
        if (request.getQnaIdx() > 0) {
            
            QnaDetail qnaDetail = service.save(request);

            if (qnaDetail != null) {
                return ResponseEntity.ok(qnaDetail);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PutMapping("/updateChat")
    public ResponseEntity<QnaDetail> updateChat(@RequestBody QnaDetail request) {
        if (request.getQnaIdx() > 0) {
            
            int qnaDetail = service.updateChat(request);

            if (qnaDetail > 0) {
                return ResponseEntity.ok(request);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.badRequest().body(null);
    }

    // 기록
    @GetMapping("/chat")
    public ResponseEntity<ResQnaDetail> chat(@RequestParam int qnaIdx) {
        if (qnaIdx > 0) {
            
            ResQnaDetail qna = service.selectQnaDetail(qnaIdx);

            if (qna != null) {
                return ResponseEntity.ok(qna);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.badRequest().body(null);
    }
}
