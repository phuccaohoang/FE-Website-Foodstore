import { useEffect, useState } from "react";
import { Table, Button, Row, Input, Radio, Col, Tag, Tooltip, Select } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { ModalUpdateFoods } from "../../../components/modals/modal-update-foods/ModalUpdateFoods";
//
import foodService from "../../../services/foodService";

const columns = [
    { title: 'STT', dataIndex: 'stt' },
    { title: 'Anh', dataIndex: 'images' },
    { title: 'Ten', dataIndex: 'name' },
    { title: 'Loai', dataIndex: 'category' },
    { title: 'Mo ta', dataIndex: 'description' },
    { title: 'Gia', dataIndex: 'price' },
    { title: 'Giam gia (%)', dataIndex: 'discount' },
    { title: 'Da ban', dataIndex: 'sold' },
    { title: 'Diem danh gia', dataIndex: 'rating' },
    { title: 'Trang thai', dataIndex: 'status' },
];
// const dataSource = Array.from({ length: 10 }).map((_, i) => ({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
// }));

const styleButton = {
    padding: '10px 15px',
}

export const ListFoods = () => {
    const [openUpdate, setOpenUpdate] = useState(false)

    const navigate = useNavigate()
    const [foods, setFoods] = useState([])



    useEffect(() => {
        const loadFoods = async () => {

            const response = await foodService.getFoods();
            if (response.status) {
                setFoods(response.data.map((item, idx) => {
                    return {
                        ...item,
                        key: idx,
                        stt: idx + 1,
                        category: item.category.name,
                        status: item.status === 1 ? 'On' : 'Off',
                    }
                }))
            }

        }

        //
        loadFoods()
    }, []);


    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bo loc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>
                    <Col span={24}>
                        <Input placeholder="Tu khoa" />
                    </Col>
                    <Col span={24}>
                        <Tooltip placement="top" title="loai mon an">

                            <Radio.Group
                                defaultValue="0"
                                optionType="button"
                                buttonStyle="solid"
                            >
                                <Radio value='0'>Tat ca</Radio>
                                <Radio value='1'>Loai 1</Radio>
                                <Radio value='2'>Loai 2</Radio>
                                <Radio value='3'>Loai 3</Radio>
                                <Radio value='4'>Loai 4</Radio>
                                <Radio value='9'>Khac</Radio>
                            </Radio.Group>
                        </Tooltip>
                    </Col>
                    <Col offset={0}>
                        <Tooltip placement="top" title="sap xep theo gia ban">
                            <Select
                                defaultValue="1"
                                style={{ width: 170 }}

                                options={[
                                    { value: '1', label: 'Gia ban giam dan' },
                                    { value: '2', label: 'Gia ban tang dan' },
                                ]}
                            />

                        </Tooltip>
                    </Col>
                    <Col offset={1}>
                        <Tooltip placement="top" title="sap xep theo so luong da ban">
                            <Select
                                defaultValue="1"
                                style={{ width: 170 }}

                                options={[
                                    { value: '1', label: 'Da ban giam dan' },
                                    { value: '2', label: 'Da ban tang dan' },
                                ]}
                            />

                        </Tooltip>
                    </Col>
                    <Col offset={1}>
                        <Tooltip placement="top" title="sap xep theo diem danh gia">
                            <Select
                                defaultValue="1"
                                style={{ width: 150 }}

                                options={[
                                    { value: '1', label: 'Diem giam dan' },
                                    { value: '2', label: 'Diem tang dan' },
                                ]}
                            />

                        </Tooltip>
                    </Col>
                    <Col offset={1}>
                        <Tooltip placement="top" title="trang thai mon an">

                            <Select
                                defaultValue="0"
                                style={{ width: 120 }}

                                options={[
                                    { value: '0', label: 'Tat ca' },
                                    { value: '1', label: 'Hien thi' },
                                    { value: '2', label: 'An' },

                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }}>
                        <Button color="blue" variant="dashed" style={{ marginRight: 10 }}>Reset</Button>
                        <Button color="lime" variant="solid">Tim kiem</Button>
                    </Col>

                </Row>
            </div >

            <div className="Title__Page">

                <h1>Danh sach cac mon an</h1>
                <Button style={styleButton} color="blue" variant="solid"
                    onClick={() => {
                        navigate('/admin/foods/add')
                    }}
                >
                    <PlusOutlined style={{ fontSize: '20px' }} />
                </Button>
            </div>

            <Table
                rowSelection={{

                    onChange: (items) => {
                        console.log('list', items)
                    }
                }}
                columns={columns}
                dataSource={foods}
                pagination={{
                    defaultCurrent: 1,
                    total: 50,
                    pageSize: 10,
                    onChange: (item) => {
                        console.log('page', item)
                    }
                }}

                footer={() => {
                    return (
                        <>
                            <div className="Footer__Table">
                                <Button style={styleButton} color="gold" variant="solid"
                                    onClick={() => {
                                        setOpenUpdate(true)
                                    }}
                                >
                                    Chinh sua
                                </Button>
                                <Button style={styleButton} color="lime" variant="solid">Hien thi</Button>
                                <Button style={styleButton} color="danger" variant="solid">An</Button>
                            </div>
                        </>
                    )
                }}
            />




            <ModalUpdateFoods
                foods={[1, 2]}
                open={openUpdate}
                onCancel={() => {
                    setOpenUpdate(false)
                }}
            />
        </>
    )
}