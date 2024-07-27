package com.solucius.solucius.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class GeneratedToken {

    private String accessToken;
    private String refreshToken;
}