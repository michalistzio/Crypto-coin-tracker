import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import PriceDisplay from '../components/PriceDisplay';

const CoinDetails = () => {

  const backgroundImageURL = 'https://www.simplilearn.com/ice9/free_resources_article_thumb/cryptocurrency_explained.jpg';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageURL})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh'
  };

  const getTradeDirection = (price) => {
    if (price > 0) {
      return <span className="trade-up">&#9650;</span>; // Trade-up symbol (▲)
    } else if (price < 0) {
      return <span className="trade-down">&#9660;</span>; // Trade-down symbol (▼)
    } else {
      return null; // No trade symbol if price remains unchanged
    }
  };

  const { id } = useParams();
  const [cryptocurrency, setCryptocurrency] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost:8080/coins/${id}`);
        const jsonData = await response.json();
        setCryptocurrency(jsonData.coin);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={backgroundStyle}>
      <Container className="p-3">
        <Row className="mt-5">
          <Col md={6} className="offset-md-3">
            <Card className="card text-bg-success mb-3">
              <Card.Header>
                <Link to={`/`} >Back to coins</Link>
              </Card.Header>
              <Card.Body >
                <Card.Title className="mb-2  text-center" ><strong>{cryptocurrency.name}</strong></Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: cryptocurrency.desc }}  ></Card.Text>
                <hr />
                <Card.Text>
                  <strong>Price:</strong> $ {cryptocurrency.cp}
                </Card.Text>
                <Card.Text>
                  <strong>Last 24h:</strong> $ {getTradeDirection(cryptocurrency.price_change_24h)} {cryptocurrency.price_change_24h}
                </Card.Text>
                <Card.Text>
                  <strong>Last 7 days:</strong> $ {getTradeDirection(cryptocurrency.price_change_percentage_7d)} {cryptocurrency.price_change_percentage_7d} 
                </Card.Text>
                <Card.Text>
                  <strong>Last 14 days:</strong> $ {getTradeDirection(cryptocurrency.price_change_percentage_14d)} {cryptocurrency.price_change_percentage_14d}
                </Card.Text>
                <Card.Text>
                  <strong>Last 1 month:</strong> $ {getTradeDirection(cryptocurrency.price_change_percentage_30d)} {cryptocurrency.price_change_percentage_30d}
                </Card.Text>
                <Card.Text>
                  <strong>Last 2 months:</strong> $ {getTradeDirection(cryptocurrency.price_change_percentage_60d)} {cryptocurrency.price_change_percentage_60d}
                </Card.Text>
                <Card.Text>
                  <strong>Last 200 days:</strong> $ {getTradeDirection(cryptocurrency.price_change_percentage_200d)} {cryptocurrency.price_change_percentage_200d}
                </Card.Text>
                <Card.Text>
                  <strong>Last 1 year:</strong> $ {getTradeDirection(cryptocurrency.price_change_percentage_1y)} {cryptocurrency.price_change_percentage_1y}
                </Card.Text>
                <hr /> 
                <Card.Text className='pb-3'>

                <Container>
                  <Row className="justify-content-md-center">
                    
                    <Col md="auto"><h5>Last 24h:</h5> </Col>
                    
                  </Row>
                  <Row>
                    <Col><strong>Highest:</strong> $ {cryptocurrency.h24h}</Col>
                    <Col></Col>
                    <Col className='ps-5'> <strong>Lowest:</strong> $ {cryptocurrency.l24h}</Col>
                  </Row>
                </Container>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
    
};

export default CoinDetails;