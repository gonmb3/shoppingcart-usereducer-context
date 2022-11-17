import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useCartContext } from '../context/CartProvider'
import Rating from './Rating'

const SingleProduct = ({ product }) => {

    const { state: { cart }, dispatch } = useCartContext();

    

    return (
        <div className='products '>
            <Card>                     { /* Product image */}
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                    { /* Product Name */}
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        { /* Product price */}
                        <span>
                            ${product.price}
                        </span>
                        { /* Product delivery */}
                        <span>
                            {product.fastDelivery ?
                                (<div>Delivery Express</div>)
                                : (
                                    <div>10 days delivery</div>
                                )}
                        </span>
                        { /* Product rating */}
                        <Rating rating={product.rating} />

                    </Card.Subtitle>

                    { /* ADD TO CART AND REMOVE FUNCTIONS ----*/}            
                    {
                        cart.some(p => p.id === product.id) ? (

                            <Button         // remove from cart
                            onClick={() => {  
                                dispatch({
                                    type:"REMOVE_FROM_CART",
                                    payload:product
                                })
                            }}
                            variant="danger">
                                Remove
                            </Button>
                        ) : (
                            <Button  // IF YOU ADD A PRODUCT TO THE CART, REMOVE BUTTON APPEAR 
                            onClick={() => {
                                dispatch({    // add to cart
                                    type:"ADD_TO_CART",
                                    payload:product
                                })
                            }}
                                disabled={!product.inStock}
                                className='mx-2'>
                                {product.inStock ? "Add to Cart" : "No Stock"}
                            </Button>
                        )
                    }


                </Card.Body>
            </Card>
        </div>
    )
}

export default SingleProduct