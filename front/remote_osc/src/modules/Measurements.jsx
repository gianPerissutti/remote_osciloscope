import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Measurements = () => {
    return (
        <Container>
            <Row>
                <Col style={{ color: '#FFD700' }}>Peak voltage: 5[V]</Col>
                <Col style={{ color: '#FFD700' }}>Frecuency: 500[Hz]</Col>
                <Col style={{ color: '#FFD700' }}>Rise Time: 2 [mS]</Col>
            </Row>
        </Container>
    );    
}
export default Measurements;