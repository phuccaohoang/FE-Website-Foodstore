import { Layout, Row, Col, Typography, Image, Divider } from 'antd';
import aboutusimg from '../../../assets/aboutus.png'
import aboutusimg2 from '../../../assets/a1.png'
import aboutusimg3 from '../../../assets/a2.png'
import aboutusimg4 from '../../../assets/a3.png'
const { Title, Paragraph } = Typography;

export const AboutUs = () => {
    return (
        <Layout style={{ width: '65%', margin: '20px auto' }}>
            <Image
                src={aboutusimg}
                preview={false}
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                }}
            />

            <Typography style={{ textAlign: 'center', marginTop: 32 }}>
                <Title style={{ fontSize: '100px' }}>ABOUT US</Title>
            </Typography>

            <Row gutter={[32, 48]} justify="center" style={{ marginTop: 24 }}>
                <Col xs={24} md={8}>
                    <Image
                        src={aboutusimg2}
                        width="100%"
                        height={200}
                        style={{
                            objectFit: 'cover',
                            marginBottom: 16,
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none'
                        }}
                        preview={false}
                    />
                    <Paragraph style={{ textAlign: 'justify', fontSize: '20px' }}>
                        Bạn đang tìm kiếm một trải nghiệm ẩm thực mới lạ, độc đáo? Nơi hương vị truyền thống hòa quyện cùng sự sáng tạo hiện đại? Hãy cùng khám phá... <strong>FOODSTORE!</strong>
                    </Paragraph>
                </Col>

                <Col xs={24} md={8}>
                    <Image
                        src={aboutusimg3}
                        width="100%"
                        height={200}
                        style={{
                            objectFit: 'cover',
                            marginBottom: 16,
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none'
                        }}
                        preview={false}
                    />
                    <Paragraph style={{ textAlign: 'justify', fontSize: '20px' }}>
                        <strong>FOODSTORE</strong> không chỉ là một cửa hàng đồ ăn thông thường. Chúng tôi tự hào mang đến một thực đơn đa dạng, phong phú, từ những món ăn quen thuộc được biến tấu độc đáo, đến những hương vị quốc tế đặc sắc. Với niềm đam mê ẩm thực và sự tận tâm trong từng món ăn, FOODSTORE cam kết mang đến cho bạn những trải nghiệm vị giác khó quên. Chất lượng nguyên liệu luôn là ưu tiên hàng đầu của chúng tôi, đảm bảo mỗi bữa ăn không chỉ ngon miệng mà còn an toàn và dinh dưỡng.
                    </Paragraph>
                </Col>

                <Col xs={24} md={8}>
                    <Image
                        src={aboutusimg4}
                        width="100%"
                        height={200}
                        style={{
                            objectFit: 'cover',
                            marginBottom: 16,
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none'
                        }}
                        preview={false}
                    />
                    <Paragraph style={{ textAlign: 'justify', fontSize: '20px' }}>
                        Đừng chần chừ nữa! Hãy đến và khám phá thế giới ẩm thực đầy màu sắc tại <strong>FOODSTORE</strong> ngay hôm nay. Chúng tôi luôn sẵn sàng chào đón bạn!
                    </Paragraph>
                </Col>
            </Row>

            <Divider />

            <Row justify="center">
                <Col xs={24} md={16} style={{ textAlign: 'center' }}>
                    <Title level={4}>FOODSTORE - Nơi hương vị thăng hoa, trải nghiệm trọn vẹn!</Title>
                    <Paragraph style={{ fontSize: '20px' }}>
                        <strong>Thông tin liên hệ:</strong><br />
                        Gọi ngay: 1900123456<br />
                        Email: foodstore@gmail.com<br />
                        Địa chỉ: 123, Huỳnh Thúc Kháng, phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                    </Paragraph>
                </Col>
            </Row>
        </Layout>
    );
};
