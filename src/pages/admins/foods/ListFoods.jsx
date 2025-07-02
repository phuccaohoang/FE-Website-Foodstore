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
        title: 'Ảnh', dataIndex: 'images', width: 100, render: (images) => {
            return <>
                <div className="Img__TD">

                    <Image.PreviewGroup>
                        {
                            images.map(img => {
                                return <Image width={150} height={100} style={{ objectFit: 'cover' }} src={`http://127.0.0.1:8000/${img.img}`} />

                            })
                        }

                    </Image.PreviewGroup>
                </div>

            </>
        }
    },
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Loại', dataIndex: 'category' },
    { title: 'Mô tả', dataIndex: 'description' },
    { title: 'Giá', dataIndex: 'price' },
    { title: 'Giảm giá (%)', dataIndex: 'discount' },
    { title: 'Đã bán', dataIndex: 'sold' },
    { title: 'Xếp hạng', dataIndex: 'rating' },
    { title: 'Trạng thái', dataIndex: 'status' },
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
    const [categoryId, setCategoryId] = useState(0)
    const [sortBy, setSortBy] = useState('default')
    const [status, setStatus] = useState(2)
    const [name, setName] = useState('')
    const [page, setPage] = useState({
        current_page: 1,
        total: 1,
        last_page: 1,
        per_page: 5,
    })
    //
    const { refresh, setRefresh, openNotification } = useSession();

    useEffect(() => {
        const loadFoods = async () => {

            const response = await foodService.getFoods({
                status: status,
                name: name,
                sort_by: sortBy,
                category_id: categoryId,
                page: page.current_page,
                per_page: page.per_page
            });
            if (response.status) {
                setFoods(response.data.map((item, idx) => {
                    return {
                        ...item,
                        key: item.id,
                        stt: idx + 1,
                        category: item.category.name,
                        status: item.status === 1 ? 'Hiển thị' : 'Đang ẩn',
                        images: item.images,
                    }
                }))
                setPage(response.page)
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

    const notifications = () => {
        setRefresh(!refresh)
        setselectedRows([])
    }


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
                    <Col span={24}>
                        <Tooltip placement="top" title="Loại món ăn">

                            <Radio.Group
                                defaultValue={0}
                                optionType="button"
                                buttonStyle="solid"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <Radio value={0}>Tất cả</Radio>
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
                        <Tooltip placement="top" title="Sắp xếp">
                            <Select
                                defaultValue="default"
                                style={{ width: 170 }}
                                value={sortBy}
                                onChange={e => setSortBy(e)}
                                options={[
                                    { value: 'default', label: 'Món mới' },
                                    { value: 'sold_desc', label: 'Số lượng đã bán giảm dần' },
                                    { value: 'sold_asc', label: 'Số lượng đã bán tăng dần' },
                                    { value: 'price_desc', label: 'Giá bán giảm dần' },
                                    { value: 'price_asc', label: 'Giá bán tăng dần' },
                                    { value: 'rating_desc', label: 'Đánh giá giảm dần' },
                                    { value: 'rating_asc', label: 'Đánh giá tăng dần' },
                                ]}
                            />

                        </Tooltip>
                    </Col>

                    <Col offset={1}>
                        <Tooltip placement="top" title="Trạng thái món ăn">

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
                            setCategoryId(0)
                            setSortBy('default')
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

                <h1>Danh sách các món ăn</h1>
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

                footer={() => {
                    return (
                        <>
                            <div className="Footer__Table">
                                <Button style={styleButton} color="gold" variant="solid"
                                    onClick={() => {
                                        if (selectedRows.length === 0) openNotification('Cảnh báo', 'Hãy chọn món ăn', 'warning')
                                        else {
                                            setOpenUpdate(true)

                                        }
                                    }}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button style={styleButton} color="lime" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) openNotification('Cảnh báo', 'Hãy chọn món ăn', 'warning')
                                        else {
                                            const response = await foodService.updateFoodStatus(selectedRows, 1);
                                            if (response.status) {
                                                notifications()
                                                openNotification('Thành công', 'Cập nhật trạng thái thành công', 'success')
                                            } else {
                                                openNotification('Thất bại', 'Cập nhật trạng thái thất bại', 'error')

                                            }
                                        }
                                    }}
                                >
                                    Hiển thị
                                </Button>
                                <Button style={styleButton} color="danger" variant="solid"
                                    onClick={async () => {
                                        if (selectedRows.length === 0) openNotification('Cảnh báo', 'Hãy chọn món ăn', 'warning')

                                        else {
                                            const response = await foodService.updateFoodStatus(selectedRows, 0);
                                            if (response.status) {
                                                notifications()
                                                openNotification('Thành công', 'Cập nhật trạng thái thành công', 'success')

                                            } else {
                                                openNotification('Thất bại', 'Cập nhật trạng thái thất bại', 'error')

                                            }
                                        }
                                    }}
                                >
                                    Ẩn
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