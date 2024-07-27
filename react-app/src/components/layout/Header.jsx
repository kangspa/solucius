import { InputText } from 'primereact/inputtext';
import './Layout-main.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="h-container">
            <div className="item start">
                <h1
                    style={{cursor: 'pointer'}}
                    onClick={() => {navigate('/problem/question')}}
                >
                    Components
                </h1>
            </div>
            <div className="item last">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" />
                </span>
            </div>
        </div>
    )
}