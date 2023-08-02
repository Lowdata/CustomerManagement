import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { Login } from './pages/login';
import { CustomerList } from './pages/customer-list';

export const appContext= createContext();
const LoginPage = () => {
  const [isLoggedIn,setIsLoggedIn]= useState(null);
  const [update,setIsUpdate]= useState(null);

  const [userData,setUserData]= useState([]);
  useEffect(()=>{
    if(isLoggedIn){
      sessionStorage.setItem('auth',isLoggedIn);
      fetchListIetms();
    }
  },[isLoggedIn])

  useEffect(()=>{
    sessionStorage.getItem('auth')?setIsLoggedIn(sessionStorage.getItem('auth')):setIsLoggedIn(null);
  })
  useEffect(()=>{
    console.log("bfhbg",update);
  },[update])
  const fetchListIetms= async ()=>{
    const apiUrl = "http://localhost:8000/";
    const res= await axios.get(apiUrl+"get_customer_list");
    console.log(res.data);
    setUserData(res.data);
  }

  return (
    <appContext.Provider value={{isLoggedIn,setIsLoggedIn,userData,setIsUpdate,update}}>
      <div className="flex items-center justify-center h-screen bg-white">
        {
          !isLoggedIn
            ?<Login/>
            :<CustomerList/>
        }
      </div>
    </appContext.Provider>
  );
};
export default LoginPage;
