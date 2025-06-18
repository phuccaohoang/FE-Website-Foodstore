import './order.css'
import { Table, Tag, Button, Card, Typography, Image, Popconfirm } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from 'react';
import mon from '../../../assets/mon2.jpg'

const { Title } = Typography;

const getStatusTag = (status) => {
    switch (status) {
        case "Đã giao":
            return <Tag color="green">Đã giao</Tag>;
        case "Đang chuẩn bị":
            return <Tag color="orange">Đang chuẩn bị</Tag>;
        case "Đã hủy":
            return <Tag color="red">Đã hủy</Tag>;
        default:
            return <Tag>{status}</Tag>;
    }
};



export const Order = () => {

    const [orders, setOrders] = useState([
        {
            id: "DH001",
            date: "2025-06-10",
            status: "Đã giao",
            total: 320000,
            image: { mon },
        },
        {
            id: "DH002",
            date: "2025-06-11",
            status: "Đang chuẩn bị",
            total: 185000,
            image: { mon },
        },
        {
            id: "DH003",
            date: "2025-06-12",
            status: "Đã hủy",
            total: 210000,
            image: { mon },
        },
    ]);

    const handleViewDetail = (order) => {
        message.info(`Xem chi tiết đơn: ${order.id}`);
    };

    const handleCancelOrder = (orderToCancel) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderToCancel.id ? { ...o, status: "Đã hủy" } : o
            )
        );
        message.success(`Đã hủy đơn hàng ${orderToCancel.id}`);
    };

    const columns = [
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            width: 80,
            render: (src) => (
                <Image
                    src={mon}
                    alt="food"
                    width={60}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                />
            ),
        },
        {
            title: "Mã đơn",
            dataIndex: "id",
            key: "id",
            width: 100,
        },
        {
            title: "Ngày đặt",
            dataIndex: "date",
            key: "date",
            width: 130,
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
            width: 120,
            render: (total) => total.toLocaleString("vi-VN") + " ₫",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 130,
            render: getStatusTag,
        },
        {
            title: "Chức năng",
            key: "action",
            width: 160,
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetail?.(record)}
                    >
                        Chi tiết
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc muốn hủy đơn hàng này?"
                        onConfirm={() => handleCancelOrder?.(record)}
                        okText="Hủy đơn"
                        cancelText="Không"
                        disabled={record.status !== "Đang chuẩn bị"}
                    >
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            disabled={record.status !== "Đang chuẩn bị"}
                        >
                            Hủy đơn
                        </Button>
                    </Popconfirm>
                </>
            )
        },
    ];

    return (
        <Card style={{
            margin: '4px auto', width: '65%', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)', backgroundColor: '#f9fafc'
        }}>
            < Title level={3} > Đơn hàng của bạn</Title>
            <Table
                selectionColumnWidth={10}
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                tableLayout="fixed"
            />
        </Card >
    );
};