import styled from '@emotion/styled';
import {
    Box,
    Button,
    Container,
    Tab,
    Tabs,
    TextField,
    Typography,
    Divider
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from "../service/ApiService";

const TabContent = styled.div`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  width: '500px';
`;

const AccountFind = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();

    const [activeTab, setActiveTab] = useState(0);
    const [isFormDisabled, setFormDisabled] = useState(false);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log('email ::: ', email);

        // TODO 
        // 1. 생성한 uri 넣고 테스트하기
        // 2. 아이디 찾기 / 비밀번호 찾기 구분해서 parameter 넘기기
        call("/", "POST", {})
        .then((res) => {
            if(res) {
                console.log(res);

            } else {
                // catch

                console.log(res);
            }
        });
        // setFormDisabled(true);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '50px',
                    padding: '5px'
                }}
            >
                <Typography component="h1" variant="h8" sx={{ textAlign: 'center', margin: '30px' }}>
                    아이디/비밀번호 찾기
                </Typography>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    centered
                >
                    <Tab label="아이디 찾기" />
                    <Tab label="비밀번호 찾기" />
                </Tabs>
                <TabContent isActive={activeTab === 0}>
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            minHeight: '30vh'
                        }}
                    >
                        <form onSubmit={handleFormSubmit}>
                            <Box sx={{ display: 'flex', alignItems: 'center', margin: "25px" }}>
                                <EmailIcon />
                                <Typography sx={{ minWidth: '60px', marginLeft:'5px' }}>
                                    이메일
                                </Typography>
                                <TextField
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email1"
                                    name="email1"
                                    autoComplete="off"
                                    disabled={isFormDisabled}
                                />
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isFormDisabled}
                                    sx={{ 
                                        backgroundColor: '#6366f1', 
                                        color: '#ffffff'
                                    }}
                                >
                                    확인
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </TabContent>
                <TabContent isActive={activeTab === 1}>
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            minHeight: '30vh'
                        }}
                    >
                        <form onSubmit={handleFormSubmit}>
                            <Box sx={{ display: 'flex', alignItems: 'center', margin: "25px" }}>
                                <PersonIcon />
                                <Typography sx={{ minWidth: '60px' }}>
                                    아이디
                                </Typography>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    name="username"
                                    autoComplete="off"
                                    disabled={isFormDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', margin: "25px" }}>
                                <EmailIcon />
                                <Typography sx={{ minWidth: '60px', marginLeft:'5px' }}>
                                    이메일
                                </Typography>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email2"
                                    name="email2"
                                    autoComplete="off"
                                    disabled={isFormDisabled}
                                />
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isFormDisabled}
                                    sx={{ backgroundColor: '#6366f1', color: '#ffffff' }}
                                >
                                    확인
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </TabContent>
            </Box>
        </Container>
    );
};

export default AccountFind;
