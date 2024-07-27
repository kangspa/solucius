package com.solucius.solucius.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.solucius.solucius.entity.Member;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByUserId(String username);
    Optional<Member> findByUserEmail(String email);


}
