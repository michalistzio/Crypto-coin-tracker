import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Pagination, Dropdown, Spinner, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Coins = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false); // New state variable to track data fetching progress

  const cellStyle = {
    color: 'white', // Set your desired font color here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/coins/markets?page=${currentPage}&per_page=${coinsPerPage}`);
        const jsonData = await response.json();
        if (typeof jsonData.coins_list !== 'undefined'){
          setData(jsonData.coins_list);
        }
        else{
          setIsFetching(true)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage, coinsPerPage]);

  const getTradeDirection = (price) => {
    if (price > 0) {
      return <span className="trade-up">&#9650;</span>; // Trade-up symbol (▲)
    } else if (price < 0) {
      return <span className="trade-down">&#9660;</span>; // Trade-down symbol (▼)
    } else {
      return null; // No trade symbol if price remains unchanged
    }
  };

  const goToPrevious = () => {
    if (currentPage <= 1)
      return;
    setCurrentPage(currentPage-1);
  }

  const goToNext = () => {
    if (data.length < coinsPerPage)
      return;
    setCurrentPage(currentPage+1);    
  }

  const changePageSize = (newSize) => {
    setCurrentPage(1);    
    setCoinsPerPage(newSize);
  }

  if (isFetching) {
    return (
      <Container className="p-3 loading-container">
        <Row className="mt-5">
          <Col md={6} className="offset-md-3">
            <Card className="card text-bg-success mb-3 p-3">
              <Card.Body >
                <Card.Title className="mb-4  text-center" ><strong><h3>You have exceeded the request limit!</h3></strong></Card.Title>
                <Card.Text className="mb-2  text-center">
                  <Spinner animation="border" size="sm" variant="warning"/>
                  <Spinner animation="border" variant="warning"/>
                  <Spinner animation="grow" size="sm" variant="warning"/>
                  <Spinner animation="grow" variant="warning"/>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="container text-center p-3">
        <Table striped hover className="text-bg-success">
            <thead>
                <tr>
                    <th style={cellStyle}><b>Name</b></th>
                    <th style={cellStyle}><b>Symbol</b></th>
                    <th style={cellStyle}><b>Current price</b></th>
                    <th style={cellStyle}><b>Higher price</b></th>
                    <th style={cellStyle}><b>Lower price</b></th>
                    <th style={cellStyle}><b>Price change %</b></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td className='text-start ps-5'><b><Link style={cellStyle} to={`coin/${item.id}`}>{item.name}</Link></b></td>
                        <td style={cellStyle}>{item.symbol}</td>
                        <td style={cellStyle} className='text-end'>{item.current_price}</td>
                        <td style={cellStyle} className='text-end'>{item.high_24h}</td>
                        <td style={cellStyle} className='text-end'>{item.low_24h}</td>
                        <td style={cellStyle} className='text-end pe-5'> {getTradeDirection(item.price_change_percentage_24h)} {item.price_change_percentage_24h}</td>
                    </tr>
                ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center " >
              <Dropdown>
                <Dropdown.Toggle style={{ borderColor: 'white' }} className="text-bg-success">
                  Page Size: {coinsPerPage}
                </Dropdown.Toggle>
                <Dropdown.Menu >
                  <Dropdown.Item onClick={() => changePageSize(10)}>
                    10
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changePageSize(15)}>
                    15
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changePageSize(25)}>
                    25
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Pagination >
                <Pagination.Prev onClick={goToPrevious}/>  
                  <Pagination.Item  > {currentPage} </Pagination.Item>
                  <Pagination.Next onClick={goToNext} />  
              </Pagination>
          </div>
      </div>


  );
}


export default Coins