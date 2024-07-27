package com.solucius.solucius.security.jwt;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
public class JwtProperties {
    @Value("${jwt.secret}")
    private String secret;
}
