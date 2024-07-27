import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AccountFind from "./components/AccountFind";
import Home from './components/Home';
import Join from "./components/Join";
import Login from './components/Login';
import NewSolve from './components/layout/NewSolve';
import ResultSolve from './components/layout/ResultSolve';
import NewSuggest from './components/layout/NewSuggest';
import Chat from './components/layout/Chat';
import "./theme.css";
// import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
    return (
        <Router>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/" element={<Login />} />

                <Route element={<Home />}>
                    <Route path="/problem/question" element={<NewSolve />} />
                    {/* Memu.jsx에 path 정보 추가했어. 
                    각 path에 맞게 Chat처럼 페이지 만들고 element 바꿔주면 돼 */}
                    {/* 문제풀이 */}
                    <Route path="/problem/questionResult" element={<ResultSolve />} />
                    <Route path="/problem/questionChat" element={<Chat />} />

                    {/* 문제추천 */}
                    <Route path="/suggest/suggest" element={<NewSuggest />} />

                    <Route path="/suggest/solved" element={<NewSolve />} />
                    <Route path="/suggest/skipped" element={<NewSolve />} />
                    {/* 내정보 */}
                    <Route path="/account/edit" element={<NewSolve />} />
                    <Route path="/account/changePassword" element={<NewSolve />} />
                    <Route path="/account/cancel" element={<NewSolve />} />
                </Route>

                <Route path="/AccountFind" element={<AccountFind />} />

                <Route path="/SignUp" element={<Join />} />
            </Routes>
        </Router>
    );
}

export default App;
