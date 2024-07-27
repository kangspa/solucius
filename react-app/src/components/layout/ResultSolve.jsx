import { PlusOutlined } from '@ant-design/icons';
import {
    Image, Input,
    Spin, Button,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { call, convertURLtoFile } from "../../service/ApiService";
import './Layout-main.css';

// 예시 이미지

const { Search } = Input;

const ResultSolve = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const qnaIdx = searchParams.get('qnaIdx');

    const formData = new FormData();
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');

    useEffect(() => {
        call("/questionResult", "GET", {qnaIdx: qnaIdx})
            .then(res => {
                setUrl(res.url);
                formData.append('ask_field', res?.askField);
                convertURLtoFile(res.url).then(result => {
                    // todo - 이미지 구분 컬럼 추가
                    // formData.append('quest_image', result);
                    formData.append('math_image', result);

                    if(res.isDetail === 'FALSE') {
                        setAnswer(res.contents);
                        fetchAnswer();
                    }
                });
            });
    }, []);

    const fetchAnswer = () => {
        let options = {
            method: "POST",
            body: formData
        };

        fetch("http://localhost:8000/ask_from_image", options)
            .then((response) => {
                if(response.status === 200) {
                    response.json().then(data => {
                        //gpt 답변
                        console.log('질문 ::: ', data?.question);
                        console.log('답 ::: ', data?.answer);
                        setAnswer(data?.answer);
                        setQuestion(data?.question);
                        // ++ 질문/답변 저장
                        saveAnswer(data?.question, data?.answer);
                    }).catch(error => {
                        console.error('JSON 파싱 오류:', error);
                    });
                } else {

                }
            }).catch((error) => {
            console.log("error : " ,error);
        });
    }

    const saveAnswer = (p_question, p_answer) => {
        const options = {
            qnaIdx: qnaIdx,
            contents: JSON.stringify([
                {"role": "user", "content": p_question},
                {"role": "assistant", "content": p_answer}
            ])
        }
        call("/saveAnswer", "POST", options)
            .then(res => {
                console.log('답변 잘 저장 ::: ', res);
            });
    }

    // 추가 질문 버튼 눌렀을 시
    const chatHref = () => {
        navigate('/problem/questionChat?qnaIdx=' + qnaIdx);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div
                style={{
                    width: '800px'
                }}
            >
                <h1>풀이 결과</h1>
                <p>추가로 질문할 사항이 있다면 메세지를 보내주세요.</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'right',
                    width: '100%'
                }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        style={{
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            marginTop: '0px',
                        }}
                        onClick={chatHref}
                    > 추가로 질문하기 </Button>
                </div>
            </div>
            <div
                style={{ display: 'flex', flexDirection: 'row', }}>
                <span
                    style={{
                        width: '400px',
                        height: '50px',
                        marginRight: '20px',
                    }}
                >
                <h2>질문</h2>
                </span>
                <span
                    style={{
                        width: '400px',
                        height: '50px',
                    }}
                >
                <h2>결과</h2>
                </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <span
                    style={{
                        width: '400px',
                        height: '350px',
                        border: '1px solid #ccc',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '10px',
                        overflow: 'auto',
                    }}
                >
                    <Image
                        src={url}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </span>
                {answer ? (
                    <div
                        style={{
                            width: '400px',
                            maxHeight: '350px', // 최대 높이 설정
                            border: '1px solid #ccc',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'start',
                            margin: '10px',
                            overflowY: 'auto', // 세로 스크롤 바 표시
                            padding: '10px'
                        }}
                    >
                        <p style={{ whiteSpace: 'pre-wrap' }}>
                            {answer}
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            width: '400px',
                            maxHeight: '350px', // 최대 높이 설정
                            border: '1px solid #ccc',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', // 가운데 정렬을 위한 설정
                            margin: '10px',
                            overflowY: 'auto', // 세로 스크롤 바 표시
                            padding: '10px'
                        }}
                    >
                        <Spin tip="답변을 받아오고 있습니다." />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultSolve;