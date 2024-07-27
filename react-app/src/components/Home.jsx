import {
    CaretDownOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './home.css';
import Memo from './layout/Memo';
import Record from './layout/Record';
const { Header, Content, Footer, Sider } = Layout;

// import { useNavigate } from 'react-router-dom';

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="#">
                정보수정
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="#">
                비밀번호 변경
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="/">
                로그아웃
            </a>
        ),
    },
];
const Home = () => {
    const navigate = useNavigate();
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const NewSolveHref = () => {
        //logo, 문제풀이 누를 시 새 문제풀이로 이동
        navigate('/problem/question');
    }

    const NewSuggestHref = () => {
        //문제추천 누를 시 새 문제추천으로 이동
        navigate('/suggest/suggest');
    }
    const LoginHref = () => {
        //로그인 누를 시 로그인으로 이동
        navigate('/login');
    }


    return (
        <Layout>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <div style={{ margin: '0px 35px 0', }}>
                    <span onClick={NewSolveHref}
                        style={{
                            margin: '0px 5% 0px 0px',
                            cursor: 'pointer',
                        }}
                    >
                        <font
                            style={{
                                fontSize: 30,
                                fontWeight: 800 ,
                            }}>
                            Solucius
                        </font>
                    </span>
                    <span className="menu" onClick={NewSolveHref}>
                        문제풀이
                    </span>
                    <span className="menu" onClick={NewSuggestHref}>
                        문제추천
                    </span>
                    <span className="menu" onClick={NewSuggestHref}>
                        기록
                    </span>
                    <span className="lastbtn">
                        <span>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"
                                arrow
                            >
                                <Button
                                    type="link"
                                    icon={<CaretDownOutlined />}
                                    style={{
                                        color: 'black',
                                        fontSize: '16px',
                                        width: 30,
                                        height: 30,
                                        border: '1px solid #fff',
                                        boxShadow: '0px 0px #fff'
                                    }}
                                />
                            </Dropdown>
                            
                        </span>
                    </span>
                    <span className="last">
                        <span
                            style={{
                                margin: '0px 5px 0px 0px',
                            }}>
                            <Avatar style={{ backgroundColor: '#1878FFFF' }} icon={<UserOutlined />} />
                        </span>
                    </span>
                </div>
            </Header>
            <Layout>
                <Layout className="site-layout">
                    <Layout>
                        {/* 기록 */}
                        <Record />
                        {/* 컨텐츠 */}
                        <Content
                            style={{
                                margin: '24px 16px 0',
                                minHeight: '84vh',
                                overflow: 'initial',
                            }}
                        >
                            <div
                                style={{
                                    padding: 24,
                                    height: '100%',
                                    textAlign: 'center',
                                    background: colorBgContainer,
                                }}
                            >
                                <Outlet />
                            </div>
                        </Content>
                        {/* 메모 */}
                        <Memo />
                    </Layout>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;