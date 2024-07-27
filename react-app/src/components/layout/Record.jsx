import React, { useState, useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import {
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { Button,  Menu, Layout, theme, Image, Select  } from 'antd';
import styled from "styled-components";
import { call } from "../../service/ApiService";
const { Sider } = Layout;


const Record = () => {
    const navigate = useNavigate();
    // sidebar 숨기는 변수
    const [collapsed, setCollapsed] = useState(false);
    // 이미지 인덱스, 이미지, 문제풀이&문제추천 카테고리
    // const [qImage, setQImage] = useState('./example.png');
    const [qImageIdx, setQImageIdx] = useState('1'); // 0이면 오류가 생김
    const [category, setCategory] = useState('문제풀이');

    const [qnaList, setQnaList] = useState([]);

    useEffect(() => {
        call("/getQnaList", "GET", {userIdx: localStorage.getItem("USER_IDX")})
            .then(res => {
                // 배열에 저장
                setQnaList(res);
            });
    }, []);

    const goUrl = (qnaIdx) => {
        navigate('/problem/questionChat?qnaIdx=' + qnaIdx);
    }

    return (
        <Sider
            width='250'
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                padding: 24,
                textAlign: 'center',
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    marginBottom: '10px',
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        color: '#fff',
                    }}
                />
            </div>
            {collapsed ? null : (
                <>
                    {qnaList.length > 0 && qnaList.map((qna, index) => (
                        <div
                            key={index}
                            style={{
                                width: '100%',
                                height: '150px',
                                backgroundColor: '#ffffff',
                                margin: '10px 0  0',
                                borderRadius: '5px',
                                padding: '5px',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                            onClick={() => goUrl(qna.qnaIdx)}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '140px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '5px',
                                    padding: '2px',
                                    overflow: 'auto',
                                }}
                            >
                                {/* 기록 카테고리 div */}
                                {/* <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '3px',
                                }}
                                >
                                <Select
                                    style={{
                                    width: '100px',
                                    height: '25px',
                                    marginRight: '3px',
                                    fontWeight: 'bold',
                                    padding: '3px',
                                    color: '#919191',
                                    }}
                                    size='small'
                                    defaultValue="문제풀이"
                                    options={[
                                    { value: '문제풀이', label: '문제풀이' },
                                    { value: '문제추천', label: '문제추천' },
                                    ]}
                                />
                                </div> */}
                                {/* 기록 카테고리와 삭제 버튼 부분 */}
                                {/* <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '3px',
                                }}
                                >
                                <div
                                    style={{
                                    width: '55px',
                                    height: '25px',
                                    fontSize: '11px',
                                    marginRight: '3px',
                                    fontWeight: 'bolder',
                                    padding: '3px',
                                    color: '#000000',
                                    }}
                                >
                                    {category}
                                </div>
                                <Button
                                    style={{
                                    width: '48px',
                                    height: '25px',
                                    fontSize: '11px',
                                    marginRight: '3px',
                                    fontWeight: 'bold',
                                    padding: '3px',
                                    color: '#919191',
                                    }}
                                >
                                    삭제
                                </Button>
                                </div> */}
                                    {/* 메모 내용 */}
                                <Image
                                    key={index}
                                    src={qna.imgUrl}
                                    preview={false}
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </Sider>
    );
};

export default Record;