import React from 'react';
import { ProductDetails } from '../components/ProductData';
import { AiFillStar } from "react-icons/ai";
import "../CSS/Cards.css";
import { useDispatch } from 'react-redux';
import { ADD } from '../Redux/Actions/Action';

function Cards() {
    const Data = ProductDetails;

    const dispatch = useDispatch();

    const send = (e) => {
        dispatch(ADD(e))
    }

    return (
        <div className='cards-container'>
            {Data.map((product) => {
                return (
                    <div key={product.Id} className='product'>
                        <img className='product-image' src={product.Images[0]} alt={product.Title} />
                        <h2 className='product-title'>{product.Title}</h2>
                        <p className='product-rating'>Rating:  &nbsp;<span>{product.Rating} &nbsp; <AiFillStar /></span> </p>
                        <h4 className='product-price'>Price: ${product.Price}</h4>
                        <button className='add-to-cart-button' onClick={() => send(product)}>Add to cart</button>
                    </div>
                )
            })}
        </div>
    )
}
export default Cards;