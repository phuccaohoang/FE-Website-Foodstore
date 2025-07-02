import React, { useRef, useState } from 'react';
import { Card, Button, Select, Input, Typography } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSession } from '../../context/SessionContext';

const { Text } = Typography;
const { Option } = Select;

export const Chatbot = ({ visible, toggle }) => {
    const bodyChatbot = useRef();
    const { openNotification } = useSession()
    const [messages, setMessages] = useState([
        {
            role: 'chatbot',
            content: 'Chào bạn, nếu có bất kỳ thắc mắc nào có thể hỏi, tui sẵn lòng trả lời.'
        },
    ])
    const [text, setText] = useState('Tư vấn món ăn')


    const callChatbotAI = async (request) => {
        try {
            const res = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    // "model": "mistralai/mixtral-8x7b-instruct",
                    "model": "openrouter/cypher-alpha:free",
                    "messages": [
                        {
                            "role": 'system',
                            "content": 'Luôn trả lời bằng tiếng việt, tự xưng là Trợ lý Foodstore, nhiệm vụ của bạn là tư vấn món ăn cho khách hàng'
                        },
                        {
                            "role": "user",
                            "content": request
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: 'Bearer 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',
                        'Content-Type': 'application/json',
                    }
                }
            );
            const reply = res.data.choices?.[0]?.message?.content || -1;
            if (reply !== -1) {
                setMessages(prev => {
                    return [
                        ...prev,
                        {
                            role: 'chatbot',
                            content: reply
                        }
                    ]
                })


            }
            console.log('reply', reply)

        } catch (error) {
            console.log('error', error)
        }
    }




    if (!visible) return null;

    return (
        <>
            <div
                className='Chat__Bot'
                style={{
                    width: 1000,
                    height: '80vh',
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
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <span style={{ fontSize: 25 }}>Trợ lý FOODSTORE</span>

                </div>


                <div className='Chatbot__Body' style={{ flex: 1, padding: 15, overflowY: 'scroll' }} ref={bodyChatbot}>
                    {
                        messages.map((item) => {
                            if (item.role == 'chatbot') {
                                return <div
                                    // dangerouslySetInnerHTML={{ __html: item.content }}
                                    style={{ fontSize: 20, border: '1px solid black', padding: '5px 15px', borderRadius: 14, marginRight: '10%', marginBottom: '10px', whiteSpace: 'pre-wrap', }}
                                >
                                    {item.content}
                                </div>
                            } else {
                                return <div style={{ fontSize: 20, border: '1px solid black', padding: '5px 15px', borderRadius: 14, marginLeft: '10%', marginBottom: '10px', textAlign: 'right' }}>
                                    {item.content}
                                </div>
                            }

                        })
                    }
                </div>

                <div style={{
                    borderTop: '1px solid #eee',
                    padding: '15px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 'auto',
                    flexShrink: 0

                }}>
                    <Input
                        placeholder="Nhập tin nhắn..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ flex: 1, background: '#f5f5f5', borderRadius: 20, paddingLeft: 12, backgroundColor: 'white', fontSize: 20 }}
                        size='large'
                    />
                    <Button size='large' style={{ fontSize: 20, padding: 25, margin: '0 10px' }} type="primary" shape="circle" icon={<SendOutlined />}
                        onClick={() => {
                            if (text.trim() == '') {
                                openNotification('Cảnh báo', 'Hãy nhập câu hỏi.', 'warning')
                                return
                            }
                            setMessages(prev => {
                                return [
                                    ...prev,
                                    {
                                        user: 'user',
                                        content: text
                                    }
                                ]
                            })
                            setText('')
                            callChatbotAI(text)
                        }}
                    />
                </div>
            </div>
        </>
    );
};

