import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import { FaShoppingCart, FaTrashAlt, FaAngleRight } from "react-icons/fa";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { DLT } from '../Redux/Actions/Action';

function Navbar() {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);

    const getData = useSelector((state) => state.CartReducer.Carts);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DLT(id))
    }

    useEffect(() => {
        const total = () => {
            let price = 0;
            getData.map((element) => {
                return (price = element.Price * element.Quantity + price);
            });
            setAmount(price);
        };
        total();
    }, [getData]);

    return (
        <div className='Navbar'>
            <div>
                <Link to="/" className='logo'>Shopping App</Link>
            </div>

            <div>
                <div>
                    <Badge badgeContent={getData.length} color="primary"
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} >

                        <FaShoppingCart className='cartBtn' />

                    </Badge>
                </div>

                <div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}>
                        <div className='cartMenu'>
                            <div>
                                <MdCancel className='cancelBtn' onClick={handleClose} />
                            </div>

                            {getData.length ?
                                <div className='items'>
                                    {getData.map((item) => {
                                        return (
                                            <div className='itemData' key={item.Id}>
                                                <div className='imgContainer'>
                                                    <Link to={`/CardDetails/${item.Id}`} onClick={handleClose}>
                                                        <img src={item.Images[0]} alt={item.Title} className='itemImage' />
                                                    </Link>
                                                </div>
                                                <div className='itemDetails'>
                                                    <p><b>{item.Title}</b></p>
                                                    <p><b>Stock:&nbsp;</b>{item.Stock}</p>
                                                    <p><b>Price: $ </b>{item.Price}</p>
                                                    <p><b>Quantity:</b>&nbsp; {item.Quantity} </p>
                                                    <Link to={`/CardDetails/${item.Id}`} onclick={handleClose} className='detailsBtn'>
                                                        <p className='detailsBtnP'>Details</p>
                                                        <BsFillArrowRightCircleFill />
                                                    </Link>
                                                </div>
                                                <div >
                                                    <FaTrashAlt className='deleteBtn' onClick={() => dlt(item.Id)} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                :
                                <p>Cart is empty</p>
                            }

                            <div className='navBottom'>
                                <p>Total: &nbsp; &nbsp; <b>$ {amount}</b></p>

                                <button className='checkoutBtn'>Check out<FaAngleRight className='checkoutIcon' /></button>
                            </div>
                        </div>
                    </Menu>
                </div>
            </div>
        </div>
    )
}
export default Navbar;