import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Layout-main.css';
import { Layout, Breadcrumb, Upload, Select, Button, message, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const NewSuggest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentURI = location.pathname;
    const { Content } = Layout;
    const { Option } = Select;
    const [isFile, setIsFile] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 파일이 업로드되었습니다.`);
            console.log('파일정보 ::: ', info);
            setIsFile(true);
            setSelectedFile(info.file.originFileObj);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 파일 업로드에 실패했습니다.`);
            setIsFile(false);
        }
    };

    // todo : qna_idx req에 추가
    const askQuestion = async () => {
        if (isFile && selectedFile) {
            const imagePath = URL.createObjectURL(selectedFile);
            const formData = new FormData();
            formData.append('image', selectedFile);
            let options = {
                method: "POST",
                body: formData
            };
            //링크
            navigate('/problem/questionResult');
            console.log('::::::::: ', formData.get('image'));

            await fetch("http://localhost:8000/img", options).then((response) =>{
                if(response.status === 200) {
                    response.json().then(data => {
                        console.log('수식:', data);

                    }).catch(error => {
                        console.error('JSON 파싱 오류:', error);
                    });
                } else if (response.status === 403) {
                    // window.location.href = "/login"; // redirect
                } else {

                }
            }).catch((error) => {
                console.log("error : " ,error);
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
            <h1>새 문제추천</h1>
            <p>이미지 안에 문제를 읽고 해당 문제와 유사한 문제를 추천합니다.</p>
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
                <Select style={{ width: '200px', marginRight: '20px' }} defaultValue={2}>
                    <Option value={1}>고등학교</Option>
                    <Option value={2}>대학교</Option>
                    <Option value={3}>대학원</Option>
                </Select>
                <Select style={{ width: '200px', marginRight: '20px' }} defaultValue={1}>
                    <Option value={1}>수학</Option>
                    <Option value={2}>과학</Option>
                    <Option value={3}>역사</Option>
                </Select>
                <Button
                    type="primary"
                    // icon={<PlusOutlined />}
                    style={{
                        // width: '100%',
                        fontWeight: 'bold'
                    }}
                    onClick={askQuestion}
                >추천받기</Button>
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

export default NewSuggest;