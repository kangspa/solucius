package com.solucius.solucius.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.solucius.solucius.model.Memo;
import com.solucius.solucius.service.MemoService;

@RestController
public class MemoController {
    
    @Autowired
    private MemoService service;
    
    @GetMapping("/selectMemo")
    public ResponseEntity<List<Memo>> findAllByQnaUserIdx(@RequestParam int userIdx) {
        List<Memo> resMemos = service.findAllByQnaUserIdx(userIdx);
        return ResponseEntity.ok(resMemos);
    }

    @PostMapping("/createMemo")
    public ResponseEntity<Memo> createMemo(@RequestBody Memo memo) {
        Memo createdMemo = service.createMemo(memo);
        return ResponseEntity.ok(createdMemo);
    }

    @PutMapping("/updateMemo")
    public ResponseEntity<Memo> updateMemo(@RequestBody Memo updatedMemo) {
        Memo memo = service.updateMemo(updatedMemo);
        if (memo != null) {
            return ResponseEntity.ok(memo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteMemo")
    public ResponseEntity<Void> deleteMemo(@RequestBody Memo memo) {
        service.deleteMemo(memo.getMemoIdx());
        return ResponseEntity.noContent().build();
    }
}
