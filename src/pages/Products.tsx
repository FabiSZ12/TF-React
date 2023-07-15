import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import Paginations from '../component/Paginations';

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <h2>Productos</h2>
        <div className="d-flex flex-wrap">
          {currentProducts.map((product: any) => (
            <Card key={product.id} style={{ width: '18rem', margin: '10px' }}>
              <Card.Img variant="top" src={product.images} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price} $</Card.Text>
                <Link to={`/products/${product.id}`} className="btn btn-primary">
                  Ver detalles
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Paginations
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </Container>
    </div>
  );
};

export default Products;
