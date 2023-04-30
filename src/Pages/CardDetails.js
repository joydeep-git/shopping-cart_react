import React, { useEffect, useState } from 'react';
import "../CSS/CardDetails.css";
import { FiTrash2 } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD } from '../Redux/Actions/Action';
import { useNavigate } from 'react-router-dom';

function CardDetails() {

    const dispatch = useDispatch();

    const redirect = useNavigate();

    const [products, setProducts] = useState([]);

    const { Id } = useParams();

    const getData = useSelector((state) => state.CartReducer.Carts);

    const send = (e) => {
        dispatch(ADD(e));
        const updatedData = products.map((item) => {
            if (item.Id === e.Id) {
                return { ...item, Quantity: item.Quantity + 1 };
            }
            return item;
        });
        setProducts(updatedData);
    };

    const dlt = (id) => {
        dispatch(DLT(id));
        redirect("/");
    }

    // const rmv = (item) =>{
    //     dispatch(REMOVE(item))
    // }

    const rmvOne = (item) => {
        // console.log('hit cardDetails');
        if (item.Quantity > 1) {
            dispatch({ type: "RMV_ONE", payload: { Id: item.Id, Quantity: item.Quantity } });
        }
    };

    useEffect(() => {
        const compare = () => {
            let compareData = getData.filter((e) => {
                return e.Id === parseInt(Id);
            });
            setProducts(compareData);
        };
        compare();
    }, [Id, getData]);

    return (
        <div className='CardDetails1'>

            <h1>Card Details</h1>
            <div className='item1'>
                {
                    products.map((data) => {
                        return (
                            <div className='itemDetails1' key={data.Id}>
                                <div className='itemImg1'>
                                    <img src={data.Images[0]} alt="" />
                                </div>
                                <div className='itemData1'>
                                    <h3><small>Product: </small>  {data.Title}</h3>
                                    <p className='details1'><b>Details :</b>{data.Description}</p>
                                    <p><b>Brand :</b>&nbsp;{data.Brand}</p>
                                    <p><b>In Stock :</b>&nbsp;{data.Stock}</p>
                                    <p><b>Price :</b> &nbsp;$ {data.Price}</p>

                                    <div className='actions1'>
                                        <div className='itemCount1'>
                                            <button onClick={() => { rmvOne(data) }}> - </button>
                                            <input type="number1" disabled value={data.Quantity} />
                                            <button onClick={() => { send(data) }}>+</button>
                                        </div>

                                        <div>
                                            <b>Total:</b>
                                            {data.Quantity * data.Price}
                                        </div>

                                        <div className='itemRemove1' >
                                            <FiTrash2 onClick={() => dlt(data.Id)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CardDetails;