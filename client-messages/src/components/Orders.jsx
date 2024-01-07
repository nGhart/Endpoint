import { useEffect, useState } from "react"
import { BASE_URL } from "../utilities"
import axios from 'axios'

const Orders=({orders:initialOrders})=>{
    const [orders,setOrders]=useState(initialOrders)
    useEffect(()=>{
                setOrders(initialOrders)
    },[initialOrders])
    return (<>
    <h1>Orders</h1>
    <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Name</th>
      <th scope="col">Contact</th>
      <th scope="col" >Item purchased</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    
    {orders.map((item,index)=>{
        return (
            <tr key={item && item._id}>
      <th scope="row">{index+1}</th>
      <td>{item && item.name}</td>
      <td>{item && item.contact}</td>
      <td style={{textTransform:"capitalize"}}>{item && item.purchase}</td>
      <td>{item && item.total}</td>
    </tr>
        )
    })}
      
    
  </tbody>
</table>
    
    </>)
}
export default Orders