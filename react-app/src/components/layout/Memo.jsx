import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  Button,
  Layout,
  Input,
  message,
  Popconfirm,
} from 'antd';
import { call } from "../../service/ApiService";

const { Sider } = Layout;
const { TextArea } = Input;



const Memo = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let qnaIdx = searchParams.get('qnaIdx');

    const [collapsed, setCollapsed] = useState(false);

    // 새메모 div의 상태 변수
    const [showAddMemo, setShowAddMemo] = useState(false);

    // 새메모 내용 변수
    const [newStr, setNewStr] = useState('');

    // 취소할 때 돌려놓기 위해 이전 내용을 저장하는 변수
    const [value, setValue] = useState('');

    // 메모 안에 내용 변수
    const [editableStr, setEditableStr] = useState('');

    const [isEditClicked, setIsEditClicked] = useState(false);

    // 메모 배열
    const [memos, setMemos] = useState([]);

    // 수정중인 메모 index
    const [editingMemoId, setEditingMemoId] = useState(null);

    useEffect(() => {
        console.log('qnaIdx ::: ', qnaIdx);
        console.log(qnaIdx !== '' || qnaIdx !== null)
        call("/selectMemo", "GET", {userIdx: localStorage.getItem("USER_IDX")})
            .then(res => {
                // 배열에 저장
                if (res.length > 0) {
                    console.log('메인에서도 가능하게');
                    console.log(res[0].qnaIdx)
                    qnaIdx = res[0].qnaIdx;
                }
                setMemos(res);
            });
    }, [qnaIdx]);
    
    // 저장
    const handleSaveClick = () => {
        if (newStr.trim() === '') {
            message.error('메모 내용을 입력하세요.');
            return;
        }
    
        const options = {
            qnaIdx: qnaIdx,
            contents: newStr
        };

        call('/createMemo', 'POST', options)
            .then((res) => {
                setMemos([...memos, res]);
                setShowAddMemo(false);
                setNewStr('');
                message.success('메모가 저장되었습니다.');
            })
            .catch((error) => {
                console.error('메모 저장 실패:', error);
                message.error('메모 저장에 실패했습니다.');
            });
    };

    // 수정
    const handleSaveEditClick = (index) => {
        const options = {
            memoIdx: memos[index].memoIdx,
            qnaIdx: qnaIdx,
            contents: editableStr,
        };
    
        call('/updateMemo', 'PUT', options)
            .then(() => {
                const updatedMemos = [...memos];
                updatedMemos[index].contents = editableStr;
                setMemos(updatedMemos);
        
                setEditingMemoId(null);
                setIsEditClicked(false);
                setValue('');

                message.success('메모가 수정되었습니다.');
            })
            .catch((error) => {
                console.error('메모 업데이트 실패:', error);
                message.error('메모 업데이트에 실패했습니다.');
            });
    };

    // 삭제
    const handleDeleteClick = (index) => {
        const memoIdx = Number(memos[index].memoIdx);

        call('/deleteMemo', 'DELETE', {memoIdx: memos[index].memoIdx})
          .then(() => {
            const updatedMemos = [...memos];
            updatedMemos.splice(index, 1);
            setMemos(updatedMemos);
    
            message.success('메모가 삭제되었습니다.');
          })
          .catch((error) => {
            console.error('메모 삭제 실패:', error);
            message.error('메모 삭제에 실패했습니다.');
          });
    };

    // 새메모 보여주기 함수
    const handleNewMemoClick = () => {
        setShowAddMemo(true);
    }

    // 새메모 취소하는 함수
    const handleCancelClick = () => {
        setShowAddMemo(false);
        setNewStr('');
    };

    const handleEditClick = (index) => {
        setEditingMemoId(index);
        setIsEditClicked(true);
        setValue(memos[index].contents); // 수정을 시작할 때 이전 내용 저장
        setEditableStr(memos[index].contents);
    };

    const handleCancelEditClick = () => {
        setEditableStr(value); // 수정 취소 시 이전 내용으로 되돌림
        setEditingMemoId(null);
        setIsEditClicked(false);
    };
    
    return (
        <Sider
            width="250"
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
                    textAlign: 'center',
                    marginBottom: '15px',
                }}
            >
            <Button
                type="text"
                icon={collapsed ? <LeftOutlined /> : <RightOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    color: '#fff',
                }}
            />
          </div>
      
          {collapsed ? null : (
            <>
                <div
                    style={{
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    }}
                >
                    {(qnaIdx !== '' || qnaIdx !== null) && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                            }}
                            onClick={handleNewMemoClick}
                        >
                            새 메모
                        </Button>
                    )}
                {showAddMemo && (
                  <TextArea
                    placeholder="내용을 입력하세요."
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    style={{
                      width: '100%',
                      backgroundColor: '#fff',
                      margin: '15px 0  0',
                    }}
                    onChange={(e) => setNewStr(e.target.value)}
                  />
                )}
                {showAddMemo && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={handleSaveClick}
                      style={{
                        width: '55px',
                        height: '30px',
                        fontSize: '12px',
                        margin: '5px',
                        fontWeight: 'bold',
                      }}
                    >
                      저장
                    </Button>
                    <Button
                      onClick={handleCancelClick}
                      style={{
                        width: '55px',
                        height: '30px',
                        fontSize: '12px',
                        margin: '5px 0px 5px 5px',
                        fontWeight: 'bold',
                        color: '#919191',
                      }}
                    >
                      취소
                    </Button>
                  </div>
                )}
                {/* 메모 리스트 */}
                {memos.length > 0 && memos.map((memo, index) => (
                    <div
                        key={memo.memoIdx}
                        style={{
                            width: '100%',
                            backgroundColor: '#ffffff',
                            margin: '10px 0 0',
                            borderRadius: '5px',
                            padding: '5px',
                            fontSize: '14px',
                        }}
                    >
                        {/* 메모 내용 */}
                        <div
                            style={{
                                width: '100%',
                                backgroundColor: '#ffffff',
                                borderRadius: '5px',
                                padding: '3px',
                                fontSize: '14px',
                                overflow: 'auto',
                                marginBottom: '5px',
                            }}
                        >
                        {isEditClicked && index === editingMemoId ? (
                            <TextArea
                                value={editableStr}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '5px',
                                    padding: '3px',
                                    fontSize: '14px',
                                    overflow: 'auto',
                                    marginBottom: '5px',
                                }}
                                onChange={(e) => setEditableStr(e.target.value)}
                            />
                        ) : (
                            <p>{memo.contents}</p>
                        )}
                        </div>
                        {/* 메모 수정/저장/취소/삭제 버튼 */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                            }}
                        >
                            {isEditClicked && index === editingMemoId ? (
                                <>
                                    <Button
                                        onClick={handleCancelEditClick}
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
                                        취소
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => handleSaveEditClick(index)}
                                        style={{
                                            width: '48px',
                                            height: '25px',
                                            fontSize: '11px',
                                            marginRight: '3px',
                                            marginBottom: '3px',
                                            fontWeight: 'bold',
                                            padding: '3px',
                                        }}
                                    >
                                        저장
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Popconfirm
                                        title="정말로 삭제하시겠습니까?"
                                        onConfirm={() => handleDeleteClick(index)}
                                        okText="예"
                                        cancelText="아니오"
                                    >
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
                                    </Popconfirm>
                                    <Button
                                        onClick={() => handleEditClick(index)}
                                        style={{
                                            width: '48px',
                                            height: '25px',
                                            fontSize: '11px',
                                            marginRight: '3px',
                                            marginBottom: '3px',
                                            fontWeight: 'bold',
                                            padding: '3px',
                                        }}
                                    >
                                        수정
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
              </div>
            </>
          )}
        </Sider>
      );
      
};

export default Memo;
