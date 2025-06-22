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
                <Title style={{ fontSize: '100px', fontFamily: 'sans-serif' }} >ABOUT US</Title>
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
                        Bạn đang tìm kiếm một hành trình ẩm thực đầy bất ngờ ngay tại trung tâm Sài Gòn? Chào mừng bạn đến với FOODSTORE! Chúng tôi tự hào là điểm đến lý tưởng cho những ai yêu thích khám phá và thưởng thức những hương vị độc đáo, từ quen thuộc đến mới lạ. Hãy sẵn sàng để đánh thức mọi giác quan của bạn!
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
                        FOODSTORE không chỉ là nơi để bạn lấp đầy chiếc bụng đói, mà còn là không gian để bạn tận hưởng trọn vẹn niềm đam mê ẩm thực. Chúng tôi luôn nỗ lực mang đến một thực đơn phong phú, kết hợp hài hòa giữa những công thức truyền thống được lưu giữ và sự sáng tạo không ngừng. Với nguyên liệu được tuyển chọn kỹ lưỡng và đội ngũ tận tâm, FOODSTORE cam kết mỗi món ăn đều là một tác phẩm nghệ thuật, mang đến trải nghiệm ẩm thực đáng nhớ cho bạn và những người thân yêu.                    </Paragraph>
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
                        Vậy còn chần chừ gì nữa? Hãy đến và khám phá thế giới hương vị đặc sắc tại FOODSTORE ngay hôm nay! Dù bạn muốn một bữa trưa nhanh chóng, một buổi tối ấm cúng bên gia đình hay một cuộc hẹn hò lãng mạn, chúng tôi luôn sẵn sàng phục vụ bạn. Liên hệ với FOODSTORE ngay để trải nghiệm ẩm thực tuyệt vời!
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
