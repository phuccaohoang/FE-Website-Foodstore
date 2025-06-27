import { useEffect, useState } from "react";
import { Table, Button, Row, Input, Radio, Col, Tag, Tooltip, Select, Image } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { ModalUpdateFoods } from "../../../components/modals/modal-update-foods/ModalUpdateFoods";
//
import foodService from "../../../services/foodService";
import { useSession } from "../../../context/SessionContext";
import categoryService from "../../../services/categoryService";

const columns = [
    { title: 'STT', dataIndex: 'stt' },
    {
        title: 'Anh', dataIndex: 'images', width: 250, render: (images) => {
            return <>
                <div className="Img__TD">

                    <Image.PreviewGroup>
                        {
                            images.map(img => {
                                return <Image width={250} src={`http://127.0.0.1:8000/${img.img}`} />
                            })
                        }

                    </Image.PreviewGroup>
                </div>

            </>
        }
    },
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
    const [categories, setCategories] = useState([])
    const [selectedRows, setselectedRows] = useState([])

    //
    const { refresh, setRefresh } = useSession();

    useEffect(() => {
        const loadFoods = async () => {

            const response = await foodService.getFoods();
            if (response.status) {
                setFoods(response.data.map((item, idx) => {
                    return {
                        ...item,
                        key: item.id,
                        stt: idx + 1,
                        category: item.category.name,
                        status: item.status === 1 ? 'On' : 'Off',
                        images: item.images,
                    }
                }))
            }

        }
        const loadCaregories = async () => {
            const response = await categoryService.getCategories()
            if (response.status) {
                setCategories(response.data)
            }
        }

        //
        loadFoods()
        loadCaregories()
    }, [refresh]);

    const notifications = (response) => {
        alert(response.message)
        setRefresh(!refresh)
        setselectedRows([])
    }


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
                                {
                                    categories.length !== 0 ? <>
                                        {
                                            categories.map((item) => {
                                                return <Radio value={item.id}>{item.name}</Radio>
                                            })
                                        }
                                    </> : null
                                }
                            </Radio.Group>
                        </Tooltip>
                    </Col>
                    <Col offset={0}>
                        <Tooltip placement="top" title="sap xep">
                            <Select
                                defaultValue="1"
                                style={{ width: 170 }}

                                options={[
                                    { value: '1', label: 'Mon an moi' },
                                    { value: 'sold_desc', label: 'So luong da ban giam dan' },
                                    { value: 'sold_asc', label: 'So luong da tang dan' },
                                    { value: 'price_desc', label: 'Gia ban giam dan' },
                                    { value: 'price_asc', label: 'Gia ban tang dan' },
                                    { value: 'rating_desc', label: 'Danh gia giam dan' },
                                    { value: 'rating_asc', label: 'Danh gia tang dan' },
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
                    selectedRowKeys: selectedRows,
                    onChange: (items) => {
                        setselectedRows(items)
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
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            setOpenUpdate(true)

                                        }
                                    }}
                                >
                                    Chinh sua
                                </Button>
                                <Button style={styleButton} color="lime" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            const response = await foodService.updateFoodStatus(selectedRows, 1);
                                            if (response.status) {
                                                notifications(response)
                                            }
                                        }
                                    }}
                                >
                                    Hien thi
                                </Button>
                                <Button style={styleButton} color="danger" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) alert('0 row selected.')
                                        else {
                                            const response = await foodService.updateFoodStatus(selectedRows, 0);
                                            if (response.status) {
                                                notifications(response)
                                            }
                                        }
                                    }}
                                >
                                    An
                                </Button>
                            </div>
                        </>
                    )
                }}
            />




            <ModalUpdateFoods
                foods={selectedRows}
                open={openUpdate}
                onCancel={() => {
                    setOpenUpdate(false)
                    setselectedRows([])
                }}
            />
        </>
    )
}