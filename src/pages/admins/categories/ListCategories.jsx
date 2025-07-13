import { useEffect, useState } from "react";
import { Table, Button, Row, Input, Radio, Col, Tag, Tooltip, Select, Image } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { ModalUpdateFoods } from "../../../components/modals/modal-update-foods/ModalUpdateFoods";
//
import foodService from "../../../services/foodService";
import { useSession } from "../../../context/SessionContext";
import categoryService from "../../../services/categoryService";

import NoImg from '../../../assets/mon1.png';
import { ModalUpdateCategory } from "../../../components/modals/modal-update-category/ModalUpdateCategory";



const styleButton = {
    padding: '10px 15px',
}

export const ListCategories = () => {

    const [openUpdate, setOpenUpdate] = useState(false)

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    //

    const [status, setStatus] = useState(2)
    const [name, setName] = useState('')
    const [page, setPage] = useState({
        current_page: 1,
        total: 1,
        last_page: 1,
        per_page: 5,
    })
    //
    const { refresh, setRefresh, openNotification, setLoading } = useSession();




    useEffect(() => {

        const loadCaregories = async () => {
            setLoading(true)

            const response = await categoryService.getCategories({
                status: status,
                name: name,
                page: page.current_page,
                per_page: page.per_page
            })
            if (response.status) {
                setCategories(response.data.map((item, idx) => {
                    return {
                        id: item.id,
                        stt: idx + 1,
                        name: item.name,
                        status: item.status ? 'Hiển thị' : 'Đã ẩn'
                    }
                }))
                setPage(response.page)

            }
            setLoading(false)

        }

        //
        loadCaregories()
    }, [refresh]);




    const columns = [
        { title: 'STT', dataIndex: 'stt' },
        { title: 'Tên', dataIndex: 'name' },
        { title: 'Trạng thái', dataIndex: 'status' },
        {
            title: 'Chức năng', dataIndex: 'func', render: (item, record) => {
                return <>
                    <Button
                        onClick={() => {
                            setCategory({
                                id: record.id,
                                name: record.name,
                                status: record.status
                            })
                            setOpenUpdate(true)
                        }}
                    >Chỉnh sửa</Button>
                </>
            }
        },
    ];
    return (
        <>
            <div className="Filter__Table">
                <Row>
                    <h1>Bộ lọc</h1>
                </Row>

                <Row justify='left' align='middle' gutter={[16, 16]}>
                    <Col span={24}>
                        <Input placeholder="Tên" value={name} onChange={e => setName(e.target.value)} />
                    </Col>


                    <Col offset={0}>
                        <Tooltip placement="top" title="Trạng thái loại món ăn">

                            <Select
                                defaultValue={2}
                                style={{ width: 120 }}
                                value={status}
                                onChange={e => setStatus(e)}
                                options={[
                                    { value: 2, label: 'Tất cả' },
                                    { value: 1, label: 'Hiển thị' },
                                    { value: 0, label: 'Ẩn' },

                                ]}
                            />
                        </Tooltip>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }}>
                        <Button color="blue" variant="dashed" style={{ marginRight: 10 }} onClick={() => {
                            setName('')
                            setStatus(2)
                        }}>Làm mới</Button>
                        <Button color="lime" variant="solid" onClick={() => {
                            setPage(page => {
                                return {
                                    ...page,
                                    current_page: 1
                                }
                            })
                            setRefresh(!refresh)
                        }}>Tìm kiếm</Button>
                    </Col>

                </Row>
            </div >

            <div className="Title__Page">

                <h1>Danh sách các loại món ăn</h1>
                <Button style={styleButton} color="blue" variant="solid"
                    onClick={() => {
                        navigate('/admin/categories/add')
                    }}
                >
                    <PlusOutlined style={{ fontSize: '20px' }} />
                </Button>
            </div>

            <Table

                columns={columns}
                dataSource={categories}
                pagination={{
                    defaultCurrent: 1,
                    total: page.total,
                    pageSize: page.per_page,
                    onChange: (item) => {
                        setPage(page => {
                            return {
                                ...page,
                                current_page: item
                            }
                        })
                        setRefresh(!refresh)
                    }
                }}


            />


            <ModalUpdateCategory category={category} open={openUpdate} onCancel={() => {
                setOpenUpdate(false)
                setCategory(null)
            }} />


        </>
    )
}