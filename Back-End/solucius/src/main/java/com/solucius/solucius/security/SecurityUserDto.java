package com.solucius.solucius.security;

import com.solucius.solucius.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SecurityUserDto {
    private String name;
    private String email;
    private String password;
    private String id;
    private Role role;

    public Member toEntity() {
        return Member.builder()
                .userEmail(email)
                .userNm(name)
                .userPw(password)
                .userId(id)
                .userRole(role.USER)
                .build();
    }
}
