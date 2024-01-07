import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utilities";
import { toast } from "react-toastify";

const AddOrder = ({onAddOrder}) => {
  const [name,setName]=useState('')
  const [contact,setContact]=useState('')
  const [purchase,setPurchase]=useState('')
  const [total,setTotal]=useState('')

  const handleMessage=()=>{
        const headers = {
          'Content-Type': 'application/json',
                  'Authorization': `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
          }
    axios.post("http://localhost:5000/api/v1/sendMessage",{headers}).then((res)=>console.log("Message Sent")).catch((error)=>console.log(error))
  }    
const handleSubmit=(e)=>{
  const data={name,contact,purchase,total}
  e.preventDefault()
 
  axios.post(`${BASE_URL}/order/create`,data).then((resp)=>{
    if(resp.data.msg==="Order added"){
      toast.success(resp.data.msg);
      setName('');
      setContact('');
      setPurchase('');
      setTotal('');
      // handleMessage()
      onAddOrder(resp.data.newOrder);
    } else{
      toast.error(resp.data.msg);
          }
  }).catch((error)=>{console.log(error);
    toast.error("Error occurred during transaction");})
}

  return (
 <>
 <div>
  <h3 className="text-center">Add New Order</h3>
  <form onSubmit={handleSubmit} className="addForm">
  <div className="formInputs">
  <div className="mb-3 addInput">
    <label htmlFor="name" className="form-label">Name</label>
    <input 
    type="name" 
   name="name"
    className="form-control" id="name" aria-describedby="nameHelp"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    />
    
  </div>
  <div className="mb-3 addInput">
    <label htmlFor="contact" className="form-label">Contact</label>
    <input type="text" 
    name="contact" value={contact}
    className="form-control" id="contact" onChange={(e)=>setContact(e.target.value)}/>
  </div>
  
  </div>
  <div className="formInputs">
  <div className="mb-3 addInput">
    <label htmlFor="purchase" className="form-label">Item Purchased</label>
    <input type="text"  className="form-control" value={purchase}
    name="purchase" id="purchase" onChange={(e)=>setPurchase(e.target.value)}/>
  </div>
  <div className="mb-3 addInput">
    <label htmlFor="total" className="form-label">Price</label>
    <input type="text" value={total} required className="form-control" name="total"
    id="total" onChange={(e)=>setTotal(e.target.value)}/>
  </div>
  </div>
 <div className="addButton">
   
 <button type="submit" className="btn btn-primary ">Submit</button>
 </div>
</form>

 </div>
 </>

  );
};

export default AddOrder;