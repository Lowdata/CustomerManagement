import React,{useContext,useEffect,useRef, useState} from 'react'
import axios from 'axios'
import { appContext } from "../App";

export const AddCustomer = ({setAddCustomerOpened}) => {
    const {setIsUpdate,update}= useContext(appContext);
    const [customerDetails,setCustomerDetails] = useState({
        "first_name":"",
        "last_name":"",
        "street":"",
        "address":"",
        "city":"",
        "state":"",
        "email":"",
        "phone":"",
    });
    useEffect(()=>{
        if(update!==null)setCustomerDetails(update)
    },[])
    const AddCustomer = async()=>{
        const apiUrl = "http://localhost:8000/";
        if(customerDetails.first_name==='' || customerDetails.last_name===''){
            alert("Please fill first name and last name");
            setAddCustomerOpened(false)
            return;
        }
        const res= await axios.post(apiUrl+"signup_customer",customerDetails);
        console.log(res);
        setAddCustomerOpened(false)

    }
    const UpdateCustomer = async()=>{
        const apiUrl = "http://localhost:8000/";
        
        const res= await axios.post(apiUrl+`update_customer/${update.uuid}`,customerDetails);
        console.log(res);
        setIsUpdate(null);
        setAddCustomerOpened(false)
    }
    const closeTab = ()=>{
        setIsUpdate(null)
        setAddCustomerOpened(false)
    }
  return (
    <div className='bg-white rounded border-black border-2 w-1/2 h-3/4 p-4 relative'>
        <button className='absolute top-2 right-2 font-bold text-xl' onClick={closeTab}>X</button>
        {update? <p className='text-3xl font-semibold'>Update Customer Details</p>:<p className='text-3xl font-semibold'>Customer Details</p>}
        <form className='my-6 flex flex-col justify-evenly h-3/5'>
            <div className='flex justify-between my-3'>
                <input placeholder='First Name'value={customerDetails.first_name} className='flex-1 mx-2 rounded border-gray-200 border-2 text-lg font-semibold px-1 py-1' onChange={(e) =>setCustomerDetails({...customerDetails,"first_name":e.target.value})}/>
                <input placeholder='Last Name'value={customerDetails.last_name} className='flex-1 mx-2 rounded border-gray-200 border-2 text-lg font-semibold px-1 py-1'   onChange={(e) =>setCustomerDetails({...customerDetails,"last_name":e.target.value})}/>
            </div>
            <div className='flex justify-between my-3'>
                <input placeholder='Street'value={customerDetails.street} className='flex-1 mx-2 rounded border-gray-200 border-2 text-lg font-semibold px-1 py-1'    onChange={(e) =>setCustomerDetails({...customerDetails,"street":e.target.value})}/>
                <input placeholder='Address'value={customerDetails.address} className='flex-1 mx-2 rounded border-gray-200 border-2 text-lg font-semibold px-1 py-1'  onChange={(e) =>setCustomerDetails({...customerDetails,"address":e.target.value})}/>
            </div>
            <div className='flex justify-between my-3'>
                <input placeholder='City'value={customerDetails.city} className='flex-1 mx-2 rounded border-gray-200 border-2 text-lg font-semibold px-1 py-1'  onChange={(e) =>setCustomerDetails({...customerDetails,"city":e.target.value})}/>
                <input placeholder='State'value={customerDetails.state} className='flex-1 mx-2 rounded border-gray-200 border-2 text-lg font-semibold px-1 py-1'   onChange={(e) =>setCustomerDetails({...customerDetails,"state":e.target.value})}/>
            </div>
            <div className='flex justify-between my-3'>
                <input placeholder='Email' value={customerDetails.email}className='flex-1 mx-2 rounded border-gray-200 border-2 text-lg font-semibold px-1 py-1'    onChange={(e) =>setCustomerDetails({...customerDetails,"email":e.target.value})}/>
                <input placeholder='Phone' value={customerDetails.phone}className='flex-1 mx-2 rounded border-gray-200 border-2 text-lg font-semibold px-1 py-1'   onChange={(e) =>setCustomerDetails({...customerDetails,"phone":e.target.value})}/>
            </div>
            <div className='flex justify-end px-6'>
                <input value="Submit" type='submit' className='bg-blue-500 hover:bg-blue-700 hover:cursor-pointer px-3 py-2 text-white rounded' onClick={!update?AddCustomer:UpdateCustomer}/>
            </div>
        </form>
    </div>
  )
}
