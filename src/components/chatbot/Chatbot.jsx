import React, { useState } from 'react';
import { Card, Button, Select, Input, Typography } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

export const Chatbot = ({ visible, toggle }) => {



    if (!visible) return null;

    return (
        <>
            <div
                className='Chat__Bot'
                style={{
                    width: 550,
                    height: 550,
                    position: 'fixed',
                    bottom: 50,
                    right: 100,
                    zIndex: 999,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    backgroundColor: 'white',
                }}
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
                    <div style={{ padding: '0', display: 'flex', justifyContent: 'right', alignItems: 'center', columnGap: '10px' }}>
                        <Text style={{ color: 'white' }} strong>Chế độ:</Text>
                        <Select
                            value={null}
                            onChange={null}
                            style={{ width: '150px', }}
                        >
                            <Option value="advice">🛍️ Tư vấn </Option>
                            <Option value="chat">💬 Trò chuyện </Option>
                        </Select>



                    </div>
                </div>

                {/* chon mode*/}


                <div style={{
                    borderTop: '1px solid #eee',
                    padding: '15px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 'auto',
                }}>
                    <Input
                        placeholder="Nhập tin nhắn..."
                        value={null}
                        onChange={null}
                        style={{ flex: 1, background: '#f5f5f5', borderRadius: 20, paddingLeft: 12, backgroundColor: 'white' }}
                        size='large'
                    />
                    <Button size='large' type="primary" shape="circle" icon={<SendOutlined />} />
                </div>
            </div>
        </>
    );
};

