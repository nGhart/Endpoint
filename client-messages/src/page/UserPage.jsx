
import {  useNavigate } from "react-router-dom";
import AddOrder from "../components/AddOrder"
import Orders from "../components/Orders"
import { OrderProvider } from "../OrderContext";import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from "../utilities";

const UserPage=()=>{
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/order`)
      .then((resp) => {
        setOrders(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };
    
  const navigate = useNavigate();
    useEffect(() => {
        let isLoggedIn = localStorage.getItem("logged");
        if (!isLoggedIn) {
          navigate("/");
        }
      }, []);

      const logout = () => {
        localStorage.clear();
        navigate("/");
      };
    return (
        <OrderProvider>
        <div>
            <nav className="navbar nav fixed-top bg-body-tertiary">
  <div className="container-fluid">
    <h2 className="navbar-brand" href="#">  Order List</h2> 
    <button type="button" className="btn btn-light" onClick={logout}>Log Out</button>
  </div>
</nav>
       <div className="orderPage">
       <AddOrder onAddOrder={addOrder}/>
       <Orders orders={orders}/>
       </div>
        </div>
        </OrderProvider>
    )
}
export default UserPage