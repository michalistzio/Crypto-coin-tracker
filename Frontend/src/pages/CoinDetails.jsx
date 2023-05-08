import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CoinDetails = () => {

  const backgroundImageURL = 'https://www.simplilearn.com/ice9/free_resources_article_thumb/cryptocurrency_explained.jpg';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageURL})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh'
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
                <Card.Title className="mb-2  text-center" >{cryptocurrency.name}</Card.Title>
                {/* <Card.Subtitle className="mb-2  text-center" >
                  {cryptocurrency.cp}$
                </Card.Subtitle> */}
                <Card.Text dangerouslySetInnerHTML={{ __html: cryptocurrency.desc }}  ></Card.Text>
                <hr />
                <Card.Text>
                  <strong>Price:</strong> $ {cryptocurrency.cp}
                </Card.Text>
                <Card.Text>
                  <strong>Price change on the last 24h:</strong> $ {cryptocurrency.price_change_24h}
                </Card.Text>
                <Card.Text>
                  <strong>Price change on the last 7 days:</strong> $ {cryptocurrency.price_change_percentage_7d}
                </Card.Text>
                <Card.Text>
                  <strong>Price change on the last 14 days:</strong> $ {cryptocurrency.price_change_percentage_14d}
                </Card.Text>
                <Card.Text>
                  <strong>Price change on the last 1 month:</strong> $ {cryptocurrency.price_change_percentage_30d}
                </Card.Text>
                <Card.Text>
                  <strong>Price change on the last 2 months:</strong> $ {cryptocurrency.price_change_percentage_60d}
                </Card.Text>
                <Card.Text>
                  <strong>Price change on the last 200 days:</strong> $ {cryptocurrency.price_change_percentage_200d}
                </Card.Text>
                <Card.Text>
                  <strong>Price change on the last 1 year:</strong> $ {cryptocurrency.price_change_percentage_1y}
                </Card.Text>
                <Card.Text>
                  <strong>The highest price on the last day:</strong> $ {cryptocurrency.h24h}
                </Card.Text>
                <Card.Text>
                  <strong>The lowest price on the last day:</strong> $ {cryptocurrency.l24h}
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