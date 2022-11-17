import { useState, useEffect } from 'react';
import { Button, Col, Form, ListGroup, Row, Image } from 'react-bootstrap';
import { useCartContext } from '../context/CartProvider'
import Rating from './Rating';

import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  const { state: { cart }, dispatch } = useCartContext();

  const [total, setTotal] = useState();
  //Calculate total amount cart products -------
  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price * curr.qty), 0))
  }, [cart])

  return (
    <div className='home'>
      <div className='productsContainer'>
        <ListGroup>
          {
            cart.map(product => (
              <ListGroup.Item key={product.id} >
                <Row>
                  <Col md={2}>
                    <Image src={product.image} alt={product.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{product.name} </span>
                  </Col>
                  <Col md={2}>
                    {product.price}
                  </Col>
                  <Col md={2}>
                    <Rating rating={product.rating} />
                  </Col>

                  <Col md={2}>          
                    <Form.Control 
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_CART_QTY",          // change qty
                        payload:{
                          id: product.id,
                          qty: e.target.value
                        }
                      })
                    }}
                    as="select" 
                    value={product.qty}> 
                      {[...Array(product.inStock).keys()].map((x) => (  
                        <option key={x + 1}>{x + 1} </option>  // qty select 
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                  <AiFillDelete size={18}        // remove from cart
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product
                        })
                      }}
                      variant="danger"
                      style={{cursor:"pointer"}}
                      />
                    
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>

        <div className='filters summary'>
          <span className='title'>
            Subtotal : ({cart.length}) products
          </span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${Math.floor(total)}.00</span>
          <Button type="button" disabled={cart.length === 0} >
            Proceed to Checkout
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Cart