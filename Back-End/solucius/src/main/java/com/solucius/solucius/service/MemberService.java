
package com.solucius.solucius.service;

import com.solucius.solucius.security.SecurityUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.stereotype.Service;

import com.solucius.solucius.entity.Member;
import com.solucius.solucius.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    @Autowired
    private UserRepository repository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public Optional<Member> findByEmail(String email) {
        return repository.findByUserEmail(email);
    }

    public Member createUser(SecurityUserDto request) {
        return repository.save(request.toEntity());
    }
    
}
