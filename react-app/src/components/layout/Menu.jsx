import React from 'react';

import "./Layout-main.css"
import { useNavigate } from 'react-router-dom';
// import "./menu.css"

import { PanelMenu } from 'primereact/panelmenu';
import {Button} from "primereact/button";

const Menu = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: '문제 풀이',
            icon: 'pi pi-fw pi-file',
            items:[
                {
                    label: '최근 문제풀이',
                    icon: 'pi pi-fw pi-file',
                    path: '/problem/recent',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                },
                {
                    label: '완료한 문제풀이',
                    icon: 'pi pi-fw pi-file',
                    path: '/problem/completed',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                },
                {
                    label: '완료 못한 문제풀이',
                    icon: 'pi pi-fw pi-file',
                    path: '/problem/incomplete',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                }
                ]
        },
        {
            label: '문제 추천',
            icon: 'pi pi-fw pi-file',
            items:[
                {
                    label: '문제 추천받기',
                    icon: 'pi pi-fw pi-file',
                    path: '/suggest/receive',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                },
                {
                    label: '풀어본 문제',
                    icon: 'pi pi-fw pi-file',
                    path: '/suggest/solved',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                },
                {
                    label: '넘어간 문제',
                    icon: 'pi pi-fw pi-file',
                    path: '/suggest/skipped',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                }
            ]
        },
        {
            label: '내 정보',
            icon: 'pi pi-fw pi-file',
            items:[
                {
                    label: '정보 수정',
                    icon: 'pi pi-fw pi-file',
                    path: '/account/edit',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                },
                {
                    label: '비밀번호 변경',
                    icon: 'pi pi-fw pi-file',
                    path: '/account/changePassword',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                },
                {
                    label: '회원탈퇴',
                    icon: 'pi pi-fw pi-file',
                    path: '/account/cancel',
                    command: (e) => {
                        navigate(e.item.path)
                    }
                }
            ]
        }

    ]


    return (
        <div className="menuContainer">
            <div className="top">
                <div className="btn">
                <p className="pi pi-angle-double-left"></p>
                </div>
            </div>
            <div className="mid">
            <div className="card flex justify-content-center">
                <PanelMenu
                    model={items}
                    className="w-full md:w-25rem"
                />
            </div>
            </div>
        </div>
    );
};
export default Menu;
