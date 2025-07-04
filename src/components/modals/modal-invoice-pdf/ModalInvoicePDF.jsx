import { Modal } from "antd"
import {
    PDFViewer,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font
} from '@react-pdf/renderer';
import RobotoFont from '../../../fonts/Roboto-Regular.ttf';

Font.register({ family: 'Roboto', src: RobotoFont });




const styles = StyleSheet.create({
    page: {
        fontFamily: 'Roboto',
        fontSize: 12,
        padding: 30,
    },
    title: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginTop: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    row: {
        flexDirection: 'row',
    },
    cellBase: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    },

    // Cột với độ rộng cụ thể
    colStt: { width: '10%' },
    colTen: { width: '40%', textAlign: 'left' },
    colSL: { width: '15%' },
    colGia: { width: '15%' },
    colTT: { width: '20%' },
});
const InvoicePDF = ({ order, datetime }) => (

    < Document >
        {
            order ?
                <Page size="A4" style={styles.page
                } >
                    <Text style={styles.title}>HÓA ĐƠN ĐẶT MÓN</Text>

                    <View style={styles.section}>
                        <Text>Khách hàng: {order.customer.fullname}</Text>
                        <Text>Địa chỉ: {order.address}</Text>
                        <Text>SDT: {order.phone}</Text>
                        <Text>Giá vận chuyển: {order.delivery_cost} VND</Text>
                        <Text>Ghi chú: {order.note}</Text>
                        <Text>Ngày đặt: {order.created_at}</Text>
                        <Text>Ngày in: {datetime}</Text>
                    </View>

                    {/* Bảng sản phẩm */}
                    <View style={styles.table}>
                        {/* Header */}
                        <View style={styles.row}>
                            <Text style={[styles.cellBase, styles.colStt, styles.header]}>STT</Text>
                            <Text style={[styles.cellBase, styles.colTen, styles.header]}>Tên SP</Text>
                            <Text style={[styles.cellBase, styles.colSL, styles.header]}>Số lượng</Text>
                            <Text style={[styles.cellBase, styles.colGia, styles.header]}>Đơn giá (VND)</Text>
                            <Text style={[styles.cellBase, styles.colTT, styles.header]}>Thành tiền (VND)</Text>
                        </View>

                        {/* Dữ liệu */}
                        {
                            order.order_details?.map((item, idx) => {
                                const price = (100 - item.food.discount) / 100 * item.food.price
                                return <View style={styles.row}>
                                    <Text style={[styles.cellBase, styles.colStt]}>{idx + 1}</Text>
                                    <Text style={[styles.cellBase, styles.colTen]}>{item.food.name}</Text>
                                    <Text style={[styles.cellBase, styles.colSL]}>{item.quantity}</Text>
                                    <Text style={[styles.cellBase, styles.colGia]}>{price}</Text>
                                    <Text style={[styles.cellBase, styles.colTT]}>{price * item.quantity}</Text>
                                </View>
                            })
                        }

                    </View>

                    {/* Tổng cộng */}
                    <Text
                        style={{
                            marginTop: 10,
                            textAlign: 'right',
                            fontWeight: 'bold',
                        }}
                    >
                        Tổng: {order.total_money_order} VND
                    </Text>
                </Page >
                : null
        }

    </Document >
);

export const ModalInvoicePDF = ({ order, open, cancel }) => {

    const now = new Date();
    const datetime = now.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
    });

    return <>
        <Modal


            footer={false}
            open={open}
            onCancel={cancel}
            centered={false}
            width={1600}
        >
            <div style={{ padding: 20 }}>
                <h2>Xem trước hóa đơn</h2>

                {/* Vùng hiển thị PDF */}
                <PDFViewer style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}>
                    <InvoicePDF order={order} datetime={datetime} />
                </PDFViewer>


            </div>
        </Modal>
    </>
}