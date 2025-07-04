import React, { use, useEffect, useRef, useState } from 'react';
import { Card, Button, Select, Input, Typography, Skeleton } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSession } from '../../context/SessionContext';
import foodService from '../../services/foodService';
import './Chatbot.css'
const { Text } = Typography;
const { Option } = Select;


const styleMessage = {
    fontSize: 23,
    borderRadius: '24px',
    marginBottom: 15,
    padding: '10px 20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
}

export const Chatbot = ({ visible, }) => {
    const bodyChatbot = useRef();
    const { openNotification } = useSession()
    const [messages, setMessages] = useState([
        {
            role: 'chatbot',
            content: 'Chào bạn, nếu có bất kỳ thắc mắc nào có thể hỏi, tui sẵn lòng trả lời.'
        },
    ])

    const [text, setText] = useState('Tư vấn món ăn')
    const [loading, setLoading] = useState(false)

    const InfoSystem = useRef([])
    const HistoryMessages = useRef([])

    useEffect(() => {
        const loadInfoSystem = async () => {
            const res = await foodService.getFoods({
                status: 1,
                sort_by: 'discount_desc',
                per_page: 20,

            })
            if (res.status) {
                InfoSystem.current = res.data.map((item) => {
                    return `Tên món ăn: ${item.name} - Loại: ${item.category.name} - Giảm giá (%) ${item.discount} - Giá (VND) ${item.price} - Mô tả: ${item.description}`
                })
            }
        }
        //
        loadInfoSystem()
    }, [])

    useEffect(() => {
        const body = bodyChatbot.current
        if (body) {

            body.scrollTop = body.scrollHeight
            console.log('scroll', body.scrollTop, body.scrollHeight)
        }
    }, [messages])



    const callChatbotAI = async (request) => {
        const token = "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";
        HistoryMessages.current.push(request)
        if (HistoryMessages.current.length == 4) {
            HistoryMessages.current = HistoryMessages.current.slice(1)
        }
        console.log('info', InfoSystem.current)
        console.log('history', HistoryMessages.current)
        try {
            setLoading(true)
            const res = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    "model": "mistralai/mixtral-8x7b-instruct",
                    // "model": "openrouter/cypher-alpha:free",
                    "messages": [

                        {
                            "role": 'system',
                            "content": `
                                Luôn trả lời bằng tiếng việt, tự xưng là Trợ lý Foodstore.
                                Nhiệm vụ của bạn là tư vấn cho khách hàng các món ăn có trong foodstore, dữ liệu: ${InfoSystem.current}.
                                Để đặt món hãy sử dụng chức năng của Foodstore thêm vào giỏ hàng và bắt buộc sau đó vào giỏ hàng chọn thanh toán để có thể đặt món thành công, lưu ý chỉ hướng dẫn.
                                Khi tư vấn đừng tải hết dữ liệu chỉ tải 1 vài dữ liệu phù hợp yêu cầu (tối đa 4), tập trung trả lời yêu cầu mới nhất một cách ngắn ngọn.
                            
                            `
                        },
                        ...HistoryMessages.current,


                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            const reply = res.data.choices?.[0]?.message?.content || 'Đã có lỗi xảy ra xin hãy thử lại sau.';
            setMessages(prev => {
                return [
                    ...prev,
                    {
                        role: 'chatbot',
                        content: reply
                    }
                ]
            })

        } catch (error) {
            console.log('error', error)
            setMessages(prev => {
                return [
                    ...prev,
                    {
                        role: 'chatbot',
                        content: 'Đã có lỗi xảy ra xin hãy thử lại sau.'
                    }
                ]
            })
        } finally {
            setLoading(false)
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
                <div
                    style={{
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


                <div className='Chatbot__Body' style={{ flex: 1, padding: 15, overflowY: 'scroll', backgroundColor: '#f6f7f9' }} ref={bodyChatbot}>

                    {
                        messages.map((item) => {
                            if (item.role == 'chatbot') {
                                return <div
                                    className='Message_Chatbot'

                                    style={{ marginRight: '10%', whiteSpace: 'pre-wrap', backgroundColor: '#e5f1ff', ...styleMessage }}
                                >
                                    {item.content}
                                </div>
                            } else {
                                return <div
                                    className='Message_Chatbot'
                                    style={{ backgroundColor: 'white', marginLeft: '10%', textAlign: 'right', ...styleMessage }}>
                                    {item.content}
                                </div>
                            }

                        })
                    }
                    {
                        loading ? <div style={{ marginRight: '10%' }}>
                            <Skeleton.Button block active size='large' shape='round' style={{ height: 55 }} />
                        </div> : null
                    }
                </div>

                <div
                    style={{
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
                    <Button disabled={loading} size='large' style={{ fontSize: 20, padding: 25, margin: '0 10px' }} type="primary" shape="circle" icon={<SendOutlined />}
                        onClick={() => {
                            if (text.trim() == '') {
                                openNotification('Cảnh báo', 'Hãy nhập câu hỏi.', 'warning')
                                return
                            }
                            setMessages(prev => {
                                return [
                                    ...prev,
                                    {
                                        role: 'user',
                                        content: text
                                    }
                                ]
                            })


                            callChatbotAI({
                                role: 'user',
                                content: text
                            })


                            setText('')
                        }}
                    />
                </div>
            </div>
        </>
    );
};

