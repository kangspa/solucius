package com.solucius.solucius.entity;

import com.solucius.solucius.security.Role;
import com.solucius.solucius.security.SecurityUserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userIdx;

    private String userId;
    private String userPw;
    private String userNm;
    private String userEmail;
 //   private String userRole;

    @Enumerated(EnumType.STRING)
    private Role userRole;

//    @ElementCollection(fetch = FetchType.EAGER)
//    @Builder.Default
//    private List<String> roles = new ArrayList<>();
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return this.roles.stream()
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
//    }
    public static Member ofUser(SecurityUserDto joinDto) {
        Member member = Member.builder()
                .userNm(joinDto.getName())
                .userEmail(joinDto.getEmail())
                .userRole(joinDto.getRole())
                .build();
        return member;
    }

}

