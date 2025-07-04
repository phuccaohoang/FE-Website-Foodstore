import { Layout, Row, Col, Typography, Image, Divider, Card } from 'antd';
import aboutusimg from '../../../assets/aboutus.png'
import aboutusimg2 from '../../../assets/a1.png'
import aboutusimg3 from '../../../assets/a2.png'
import aboutusimg4 from '../../../assets/a3.png'
const { Title, Paragraph } = Typography;

export const AboutUs = () => {
    return (
        <Card>
            <Layout style={{ backgroundColor: '#FFFFFF' }}>


                <Typography style={{ textAlign: 'center', marginTop: 32 }}>
                    <Title style={{ fontSize: '100px', fontFamily: 'sans-serif' }} >FOODSTORE</Title>
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
                            Chào mừng bạn đến với FOODSTORE! Chúng tôi là một cửa hàng trực tuyến mang đến sự tiện lợi và đa dạng các loại thực phẩm cùng những món ăn chế biến sẵn, đáp ứng nhu cầu của cuộc sống hiện đại và bận rộn. Tại FOODSTORE, bạn sẽ khám phá một thế giới ẩm thực phong phú, từ những nguyên liệu tươi ngon đến các món ăn được chuẩn bị tỉ mỉ, giúp bạn dễ dàng có được những bữa ăn chất lượng và tiết kiệm thời gian quý báu.
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
                            Sứ mệnh của FOODSTORE là đơn giản hóa việc mua sắm thực phẩm và thưởng thức ẩm thực. Chúng tôi hiểu rằng thời gian là vô giá, vì vậy, chúng tôi xây dựng một nền tảng trực tuyến thân thiện, dễ sử dụng, nơi bạn có thể dễ dàng lựa chọn từ hàng ngàn sản phẩm đa dạng. FOODSTORE cam kết mang đến dịch vụ giao hàng nhanh chóng, tận tâm, đảm bảo thực phẩm luôn tươi mới khi đến tay bạn, giúp bạn có thêm thời gian để tận hưởng cuộc sống và những khoảnh khắc đáng nhớ.
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
                            FOODSTORE cam kết mang đến trải nghiệm mua sắm và thưởng thức ẩm thực trực tuyến tốt nhất. Chúng tôi luôn nỗ lực không ngừng để nâng cao chất lượng sản phẩm và dịch vụ, tuân thủ nghiêm ngặt các tiêu chuẩn vệ sinh an toàn thực phẩm. Đội ngũ của chúng tôi, từ những người tìm kiếm nguồn cung ứng chất lượng đến những nhân viên giao hàng nhiệt tình, đều chung một mục tiêu: mang đến sự hài lòng tuyệt đối cho khách hàng. Hãy để FOODSTORE trở thành lựa chọn hàng đầu của bạn mỗi khi có nhu cầu về thực phẩm và những bữa ăn ngon miệng!
                        </Paragraph>
                    </Col>
                </Row>

                <Divider />


            </Layout>
        </Card>
    );
};
