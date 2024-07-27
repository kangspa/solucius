package com.solucius.solucius.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.solucius.solucius.model.Memo;
import com.solucius.solucius.repository.MemoRepository;

@Service
public class MemoService {

    @Autowired
    private MemoRepository repository;

    public List<Memo> findAllByQnaUserIdx(int userIdx) {
        return repository.findAllByQnaUserIdx(userIdx);
    }

    public Memo createMemo(Memo memo) {
        return repository.save(memo);
    }

    public Memo updateMemo(Memo updatedMemo) {
        Optional<Memo> existingMemo = repository.findById(updatedMemo.getMemoIdx());

        if (existingMemo.isPresent()) {
            Memo memoToUpdate = existingMemo.get();
            memoToUpdate.setQnaIdx(updatedMemo.getQnaIdx());
            memoToUpdate.setContents(updatedMemo.getContents());
            memoToUpdate.setUpdateDt(new Date());
            return repository.save(memoToUpdate);
        }

        // 메모 없으면
        return null;
    }

    public void deleteMemo(int memoIdx) {
        repository.deleteById(memoIdx);
    }
    
}
