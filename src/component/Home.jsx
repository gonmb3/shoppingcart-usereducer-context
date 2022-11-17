import {useCartContext} from "../context/CartProvider"
import SingleProduct from './SingleProduct';
import Filters from './Filters';

const Home = () => {
  const {state:{products}, productState: {byStock, byFastDelivery, sort, byRating,searchQuery}} = useCartContext();

  //FILTER PRODUCTS BY ******

  const transformProducts = () => {    

    let sortedProducts = products;
    if(sort){                                              //FILTER PRODUCTS BY ASCENDING / DESCENDING******
        sortedProducts = sortedProducts.sort((a,b) => sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      )
    }

    if(!byStock){                                             //Filter products with , out of stock******
      sortedProducts = sortedProducts.filter(product => product.inStock)
    }

    if(byFastDelivery){                                             //Filter products by fast delivery******
      sortedProducts = sortedProducts.filter(product => product.fastDelivery)
    }

    if(byRating){                                             //Filter products by rating******
      sortedProducts = sortedProducts.filter(product => product.rating >= byRating)
    }

    if(searchQuery){                                             //Filter products by SEARCH INPUT******
      sortedProducts = sortedProducts.filter(product => product.name.toLowerCase().includes(searchQuery))
    }


    return sortedProducts
  }

  return (
    <div className="home">
      
    <Filters/> 

        <div className="productsContainer">
          {
            transformProducts().map(product => (
              <SingleProduct product={product} key={product.id} />
            ))
          }
        </div>
    </div>
  )
}

export default Home