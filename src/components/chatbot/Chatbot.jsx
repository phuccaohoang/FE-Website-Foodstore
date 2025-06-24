import React, { useState } from 'react';
import { Card, Button, Select, Input, Typography } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

export const Chatbot = ({ visible, toggle }) => {
    const [mode, setMode] = useState('advice');
    const [message, setMessage] = useState('');

    const renderContent = () => {
        if (mode === 'advice') {
            return (
                <>
                    <Text>🛍️ Em có thể tư vấn sản phẩm cho Anh/Chị. Vui lòng chọn loại món ăn:</Text>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                        <Button size="small" shape="round">Phở bò</Button>
                        <Button size="small" shape="round">Cơm tấm</Button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <Text>💬 Nhân viên hỗ trợ sẽ phản hồi trong vài phút...</Text>
                </>
            );
        }
    };

    if (!visible) return null;

    return (
        <>
            <Card
                style={{
                    width: 350,
                    position: 'fixed',
                    bottom: 150,
                    right: 84,
                    zIndex: 999,
                    borderRadius: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: 'scale(1.4)',
                    padding: 0,
                    border: ' 1px solid',

                }}
                bodyStyle={{ padding: 0 }}
            >
                {/* Header */}
                <div style={{
                    background: '#27408B',
                    color: 'white',
                    padding: '12px 16px',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>Trợ lý FOODSTORE</span>
                    <Button
                        icon={<CloseOutlined />}
                        size="small"
                        type="text"
                        style={{ color: 'white' }}
                        onClick={toggle}
                    />
                </div>

                {/* chon mode*/}
                <div style={{ padding: '16px', flexGrow: 1 }}>
                    <Text strong>Chọn chế độ:</Text>
                    <Select
                        value={mode}
                        onChange={setMode}
                        style={{ width: '100%', marginBottom: 12 }}
                    >
                        <Option value="advice">🛍️ Tư vấn </Option>
                        <Option value="chat">💬 Trò chuyện </Option>
                    </Select>

                    <div style={{ marginBottom: 10 }}>
                        <Text>👋 Xin chào! Em là trợ lý AI, rất sẵn lòng hỗ trợ Anh/Chị.</Text>
                    </div>

                    {renderContent()}
                </div>

                <div style={{
                    borderTop: '1px solid #eee',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <Input
                        placeholder="Nhập tin nhắn..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        bordered={false}
                        style={{ flex: 1, background: '#f5f5f5', borderRadius: 20, paddingLeft: 12 }}
                    />
                    <Button type="primary" shape="circle" icon={<SendOutlined />} />
                </div>
            </Card>
        </>
    );
};

