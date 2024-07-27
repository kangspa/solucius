import { UploadOutlined } from '@ant-design/icons';
import { Button, Layout, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Layout-main.css';

const NewSolve = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentURI = location.pathname;
    const { Content } = Layout;
    const [isFile, setIsFile] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 파일이 업로드되었습니다.`);
        setIsFile(true);
        setSelectedFile(info.file.originFileObj);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 파일 업로드에 실패했습니다.`);
        setIsFile(false);
      }
    };

    const { Option } = Select;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const options = {
        "인문계열": ["언어/문학", "인문과학"],
        "사회계열": ["경영/경제", "법률", "사회과학"],
        "교육계열": ["교육일반", "유아교육", "중등교육", "초등교육", "특수교육"],
        "자연계열": ["농림/수산", "생물/화학/환경", "생활과학", "수학/물리/천문/지리"],
        "공학계열": ["건축", "교통/운송", "기계/금속", "기타", "산업", "소재/재료", "전기/전자", "정밀/에너지", "컴퓨터/통신", "토목/도시", "화공"],
        "의약계열": ["간호", "약학", "의료", "치료/보건"],
        "예체능계열": ["디자인", "무용/체육", "미술/조형", "연극/영화", "음악", "응용예술"]
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedSubCategory(null); // 대분류가 바뀌면 중분류 선택 초기화
    };
    
    const handleSubCategoryChange = (value) => {
        setSelectedSubCategory(value);
    };

    const askQuestion = () => {
        if (selectedCategory === null || selectedSubCategory === null) {
            message.error('상세설정을 완료해 주세요.');
            return;
        }
        
        if (isFile && selectedFile) {
            const formData = new FormData();

            formData.append('file', selectedFile);
            formData.append('userIdx', localStorage.getItem("USER_IDX"));
            formData.append('askField', selectedCategory + "-" + selectedSubCategory);
            formData.append('imgType', 'math_image');

            let req = {
                method: "POST",
                body: formData
            };

            fetch("http://localhost:8080/question", req).then((response) =>{
                if(response.status === 200) {
                    response.json().then(res => {
                        navigate('/problem/questionResult?qnaIdx='+res.qnaIdx); // ResultSolve
                      }).catch(error => {
                        console.error('JSON 파싱 오류:', error);
                      });
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            message.error("이미지를 업로드 해주세요.");
        }
    }

    useEffect(() => {
        console.log('현재 path ::: ', currentURI);
    }, [location])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>새 문제풀이</h1>
            <p>ChatGPT에게 질문할 문제 이미지를 첨부하세요.</p>
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginTop: '20px',
                    borderRadius: '10px',
                }}>
                <div style={{marginRight: '15px'}}>상세설정</div>
                <Select 
                    style={{ width: '200px', marginRight: '20px' }}
                    placeholder="대분류 선택"
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                >
                    {Object.keys(options).map((category) => (
                        <Option key={category} value={category}>
                            {category}
                        </Option>
                    ))}
                </Select>
                <Select
                    style={{ width: '200px', marginRight: '20px' }}
                    placeholder="중분류 선택"
                    onChange={handleSubCategoryChange}
                    value={selectedSubCategory}
                    disabled={!selectedCategory} // 대분류 선택 전에는 중분류 선택 비활성화
                >
                    {selectedCategory &&
                        options[selectedCategory].map((subCategory) => (
                            <Option key={subCategory} value={subCategory}>
                                {subCategory}
                            </Option>
                        ))}
                </Select>
                <Button 
                    type="primary"
                    style={{
                        fontWeight: 'bold'
                    }}
                    onClick={askQuestion}
                >질문하기</Button>
            </div>
            <Upload
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0)}
                showUploadList={false}
                onChange={handleFileChange}
            >
                <div
                    style={{
                        width: '500px',
                        height: '350px',
                        border: '2px dashed #ccc',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        marginTop: '20px',
                    }}
                >
                    {selectedFile ? (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            alt="Selected"
                        />
                    ) : (
                        <>
                            <UploadOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                            <p>Drop Image File</p>
                        </>
                    )}
                </div>
            </Upload>
        </div>
    );
};

export default NewSolve;