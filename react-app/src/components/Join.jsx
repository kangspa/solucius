// src/components/LoginForm.js
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from "../service/ApiService";
import './Join.css';
import './Login.css';

const Join = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userNm, setUserNm] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();

    const handleJoin = async (e) => {
        // 로그인 처리를 여기에 구현합니다.
        console.log('Userid:', userId);
        console.log('Password:', userPw);
        e.preventDefault();

        try {
            call("/signup", "POST",
                {
                    userId: userId, 
                    userPw: userPw,
                    userNm: userNm,
                    userEmail: userEmail
                })
                .then((res) => {
                    if(res) {
                        console.log(res);
                        window.alert(`회원가입이 완료되었습니다.`);
                        navigate('/');
                    } else {
                        // catch
                        console.log(res);
                        //임시
                        navigate('/signup');
                    }
                });
        }
        catch (error) {
            console.error('회원가입 실패:', error);
            // 로그인 실패 시 처리 (예: 에러 메시지 표시 등)
        }

    };

    return (
        <div className="login-form-container">
            <div className="login-form-container2">
                <p className="title">
                    Solucius
                </p>
                <div className="Join-form">
                    <h2>회원가입</h2>

                    <div className="card">
                        <div>
                            <div className="flex-auto">
                                <label className="font-bold block mb-2">
                                    아이디
                                </label>
                                <InputText
                                    value={userId}
                                    onChange={(e) => {
                                        setUserId(e.target.value)
                                    }}
                                    id="userId" className="w-full"
                                />
                            </div>
                            <div className="flex-auto">
                                <label className="font-bold block mb-2">
                                    비밀번호
                                </label>
                                <InputText 
                                    value={userPw}
                                    onChange={(e) => setUserPw(e.target.value)}
                                    type="password"
                                    id="password" className="w-full"
                                />
                            </div>
                            <div className="flex-auto">
                                <label htmlFor="money" className="font-bold block mb-2">
                                    이름
                                </label>
                                <InputText 
                                    value={userNm}
                                    onChange={(e) => setUserNm(e.target.value)}
                                    id="name" className="w-full"
                                />
                            </div>
                            <div className="flex-auto">
                                <label htmlFor="hex" className="font-bold block mb-2">
                                    이메일
                                </label>
                                <InputText
                                    value={userEmail}
                                    onChange={(e) => {
                                        setUserEmail(e.target.value)
                                    }}
                                    id="email" className="w-full"
                                />
                            </div>
                        </div>
                        <Button className="Join-btn" label="가입" onClick={handleJoin} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;
