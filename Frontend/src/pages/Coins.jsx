import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Pagination, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Coins = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(10);
  const [data, setData] = useState([]);

  const cellStyle = {
    color: 'white', // Set your desired font color here
    // fontWeight: 'bold', // Additional customization
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/coins/markets?page=${currentPage}&per_page=${coinsPerPage}`);
        const jsonData = await response.json();
        setData(jsonData.coins_list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage, coinsPerPage]);

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


  if (data.length === 0) {
    return <div>Loading...</div>;
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
                        <td style={cellStyle} className='text-end pe-5'>{item.price_change_percentage_24h}</td>
                    </tr>
                ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center">
              <Dropdown bgcolor='light'>
                <Dropdown.Toggle variant="light">
                  Page Size: {coinsPerPage}
                </Dropdown.Toggle>
                <Dropdown.Menu>
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
              <Pagination bgcolor='light'>
                <Pagination.Prev onClick={goToPrevious}/>  
                  <Pagination.Item> {currentPage} </Pagination.Item>
                  <Pagination.Next onClick={goToNext} />  
              </Pagination>
          </div>
        </div>


  );
}


export default Coins