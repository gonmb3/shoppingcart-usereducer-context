import {Container, Navbar,Badge, FormControl,Dropdown, Nav, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {FaShoppingCart} from "react-icons/fa"
import { useCartContext } from '../context/CartProvider';
import { AiFillDelete } from 'react-icons/ai';

const Header = () => {

  const {state:{cart} , dispatch, productDispatch} = useCartContext(); // CONTEXT

  return (
    <Navbar bg="dark" variant="dark" >
    <Container>
      <Navbar.Brand href="#home">
        <Link style={{color:"white"}} to="/">
           Shopping Cart
        </Link>
      </Navbar.Brand>

      <Navbar.Text className='search'>

        <FormControl
          onChange={(e) =>
            productDispatch({
           type:"FILTER_BY_SEARCH",
           payload: e.target.value
         })} 
         style={{width:500}}
          placeholder="Search..."
           className='m-auto' />
      </Navbar.Text>

        <Nav>

        <Dropdown alignLeft>
            <Dropdown.Toggle > 
            <Link to="/cart">
                  <FaShoppingCart color="white"size={23}/> {/*CART ----*/}
                </Link>
                  <Badge>{cart.length} </Badge>
              </Dropdown.Toggle>
           
          
            <Dropdown.Menu  style={{minWidth:380}}>
                         
                {  
                  cart.length > 0 ? (  //SHOWING PRODUCTS ADDED TO THE CART
                  <>
                    {
                      cart.map(product => (
                        <span className='cartItem' key={product.id}> 
                        <img src={product.image}
                        className="cartItemImg"
                        alt={product.name}
                        />

                        <div className='cartItemDetail'>
                          <span>{product.name}</span>
                          <span>${product.price}</span>
                        </div>
                        <AiFillDelete size={18}
                        style={{cursor:"pointer"}}
                        onClick={() => dispatch({
                          type:"REMOVE_FROM_CART",
                          payload:product
                        })}
                        />
                        </span>
                      ))
                    }
                    <Link to="/cart">
                      <Button style={{width:"95%", margin:"0 10px"}} >
                        Go to Cart
                      </Button>
                    </Link>
                  </>
                  )     
                  : ( 
                    <span style={{padding:10}}>Cart is empty!</span> //Cart empty
                  )
                }
            </Dropdown.Menu>
        </Dropdown>
        </Nav>
      
    </Container>
  </Navbar>
  )
}

export default Header