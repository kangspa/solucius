package com.solucius.solucius.controller;

import com.solucius.solucius.model.BaseResponseBody;
import com.solucius.solucius.security.SecurityUserDto;
import com.solucius.solucius.service.EmailService;
import com.solucius.solucius.service.EmailServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.solucius.solucius.entity.Member;
import com.solucius.solucius.service.MemberService;


@RestController
public class UserController {

    @Autowired
    private MemberService service;
    // private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<Member> signup(@RequestBody SecurityUserDto request) {
        if (request.getId().isBlank() || request.getPassword().isBlank() ||
            request.getName().isBlank() || request.getEmail().isBlank()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        if (service.findByEmail(request.getEmail()) != null) {
            // 이미 존재하는 사용자 처리
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Member user = service.createUser(request);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/accountFind")
    @ApiOperation(value = "회원가입 시 이메일 인증", notes = "기존사용하고 있는 이메일을 통해 인증")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })

    public ResponseEntity<? extends BaseResponseBody> emailConfirm(
            @RequestBody @ApiParam(value="이메일 정보", required = true) String email) throws Exception {

        String confirm = emailService.sendSimpleMessage(email);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, confirm));
    }

    @PostMapping("/verifyCode")
    @ApiOperation(value = "인증코드 확인", notes = "일치 시 리턴 1")
    @ResponseBody
    public int verifyCode(String code) {

        int result = 0;
        System.out.println("code : "+code);
        System.out.println("code match : "+ EmailServiceImpl.ePw.equals(code));
        if(EmailServiceImpl.ePw.equals(code)) {
            result = 1;
        }

        return result;
    }
}
