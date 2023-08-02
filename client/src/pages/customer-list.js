import React,{useContext,useEffect, useState} from "react";
import { appContext } from "../App";
import { AddCustomer } from "./add-customer";
import axios from 'axios'

export const CustomerList= ()=>{
    const {setIsLoggedIn,userData,setIsUpdate,update}= useContext(appContext);
    const [ addCustomeOpened, setAddCustomerOpened ]= useState(false);
    const logoutButton= ()=>{
        sessionStorage.removeItem('auth');
        setIsLoggedIn(null);
    }
    const addCustomerButton= ()=>{
        setAddCustomerOpened(true);
    }
    const customerDelete= async (uuid)=>{
        const apiUrl = "http://localhost:8000/";
        const res= await axios.post(apiUrl+`delete_customer/${uuid}`);
        console.log(res);
        window.location.reload();
    }
    const customerUpdate= async(data)=>{
        setIsUpdate(data);
        setAddCustomerOpened(true);
    }
    return (
        <div className="h-full w-full">
            <div className="flex justify-between m-10">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-lg" onClick={addCustomerButton}>Add Customer</button>
                <p className="text-xl font-bold">Customer List</p>
                <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-lg" onClick={logoutButton}>Logout</button>
            </div>
            {addCustomeOpened?<div className="h-5/6 w-full flex justify-center items-center"><AddCustomer setAddCustomerOpened={setAddCustomerOpened} /></div>
            :userData.length>0?
                <div className="h-3/4 overflow-y-scroll flex m-auto w-fit">
                    <table className="m-auto flex-col">
                        <tr className="sticky top-0 bg-white ">
                            <th className="border p-3">First Name</th>
                            <th className="border p-3">Last Name</th>
                            <th className="border p-3">Address</th>
                            <th className="border p-3">City</th>
                            <th className="border p-3">State</th>
                            <th className="border p-3">Email</th>
                            <th className="border p-3">Phone</th>
                            <th className="border p-3">Action</th>
                        </tr>
                        {
                            userData.map((data)=>{
                                return(
                                    <tr key={data.uuid}>
                                        <td className="text-center border p-3 ">{data.first_name}</td>
                                        <td className="text-center border p-3"> {data.last_name}</td>
                                        <td className="text-center border p-3">{data.address}</td>
                                        <td className="text-center border p-3">{data.city}</td>
                                        <td className="text-center border p-3">{data.state}</td>
                                        <td className="text-center border p-3">{data.email}</td>
                                        <td className="text-center border p-3">{data.phone}</td>
                                        <td className="text-center border p-3">
                                            <div className="flex justify-between">
                                                <button className=" text-white px-3 py-2 rounded-lg" onClick={()=>customerDelete(data.uuid)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
<path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
</svg></button>
                                                <button className=" text-white px-3 py-2 rounded-lg"  onClick={()=>customerUpdate(data)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path d="M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 11.037109 31.304688 L 29.111328 13.232422 z"></path>
</svg></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>:
                <p className="text-center font-bold text-3xl items-center">Waiting for Data... Please be Patient</p>
            }
        </div>
    );
}