import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Image, Input
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { call } from "../../service/ApiService";
import './Layout-main.css';

const { Search } = Input;

const Chat = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const qnaIdx = searchParams.get('qnaIdx');

    const [url, setUrl] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [askField, setAskField] = useState('수학');
    const [ask, setAsk] = useState('');

    const reqMessage = [
        {"role": "system", "content": `너는 ${askField} 분야의 교수이고, 갓 입학한 학생에게도 이해하기 쉽게 잘 설명해줘.`},
        {"role": "system", "content": "다음 제시되는 문제에 대해서 자명한 사실도 이해하기 쉽게 풀어서 설명해 줘."},
        {"role": "system", "content": "만약 문제가 한국어가 아니면, 답변 시작할 때 '문제: ' 이후 문제를 한국어로 번역해서 한 줄로 작성해주고, 그 이후에 풀이를 작성해줘."},
    ]

    const formData = new FormData();

    useEffect(() => {
        // qnaIdx로 qna_detail, img table 조회
        call("/chat", "GET", {qnaIdx: qnaIdx})
            .then(res => {
                setUrl(res?.imgUrl);
                setAskField(res?.askField);
                setChatMessages(JSON.parse(res?.contents));
            });
    }, [qnaIdx]);

    // 답
    const fetchAnswer = (p_question) => {
        const newChatMessages = [...reqMessage, ...chatMessages, p_question];

        formData.append('ask_field', askField);
        formData.append('additional_question', JSON.stringify(newChatMessages));

        let options = {
            method: "POST",
            body: formData
        };

        fetch("http://localhost:8000/ask_from_image", options)
            .then((response) => {
                if(response.status === 200) {
                    response.json().then(data => {
                        // gpt 답변 저장
                        console.log('gpt 답변 ::: ', data?.answer)
                        const param = { "role": "assistant", "content": data?.answer };
                        addChatMessage(param);
                        updateChat(param);
                    }).catch(error => {
                        console.error('JSON 파싱 오류:', error);
                    });
                } else {
                    
                }
            }).catch((error) => {
            console.log("error : " ,error);
        });
    }

    const addChatMessage = (row) => {
        setChatMessages(prevChatMessages => [...prevChatMessages, row]);
    };

    // 질문
    const onSearch = (value, _e, info) => {
        setAsk('');
        const param = {"role": "user", "content": value};
        addChatMessage(param);
        fetchAnswer(param);
        updateChat(param);
    };

    const updateChat = (param) => {
        const contents = [...chatMessages, param];
        const options = {
            qnaIdx: qnaIdx,
            contents: JSON.stringify(contents)
        }
        call("/updateChat", "PUT", options);
    }

    const NewSolveHref = () => {
        //logo, 문제풀이 누를 시 새 문제풀이로 이동
        navigate('/problem/question');
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh'
            }}
        >
            <h1 style={{ margin: '0px', paddingTop: '20px' }}>풀이 결과</h1>
            <p>추가로 질문할 사항이 있다면 메세지를 보내주세요.</p>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                style={{
                    fontWeight: 'bold',
                    marginLeft: 'auto',
                    marginBottom: '10px'
                }}
                onClick={NewSolveHref}
            > 새 질문 </Button>
            {/* 채팅창 안 */}
            <div
                style={{
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'rgba(204,204,204,0.27)',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* 이미지 */}
                <div
                    style={{
                        width: '40%',
                        height: 'auto',
                        border: '1px solid #ccc',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '20px',
                        backgroundColor: '#fff',
                        padding: '10px',
                        borderRadius: '10px',
                    }}
                >
                    <Image
                        src={url}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
                <div style={{ width: '100%', padding: '20px' }}>
                    {chatMessages.slice(1).map((chat, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: chat.role === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '10px',
                            }}
                        >
                            <div
                                key={index}
                                style={{
                                    maxWidth: '80%',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: '1px solid #ccc',
                                    backgroundColor: chat.role === 'user' ? '#fff' : 'lightblue', // 사용자와 대화 상대의 스타일 지정
                                }}
                            >
                                {chat.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{ width: '100%', marginTop: '20px' }} >
                <Search
                    value={ask}
                    placeholder="답변에 대해 추가로 질문할 사항을 입력하세요."
                    allowClear
                    enterButton="질문하기"
                    size="large"
                    onChange={(e) => setAsk(e.target.value)}
                    onSearch={onSearch}
                />
            </div>
        </div>
    );
};

export default Chat;