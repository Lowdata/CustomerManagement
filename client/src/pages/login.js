import React,{useState,useContext} from "react";
import axios from 'axios'
import { appContext } from "../App";

export const Login= ()=>{
    const [login_id, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const {isLoggedIn,setIsLoggedIn}= useContext(appContext);
    const authenticateUser = async (data) => {
        data.preventDefault();
        const apiUrl = "http://localhost:8000/";
        const requestBody = {
          login_id: login_id,
          password: password,
        };
    
        try{
          const response = await axios({
            method: 'post',
            url: apiUrl + "auth",
            data: requestBody,
          })
          setIsLoggedIn(response.data)
        }
        catch(error){
          alert("Incorrect Password");
        } 
      }
    return (
        <div className="bg-white rounded-lg p-8 shadow-md w-96">
        <p className="text-3xl font-bold mb-6 text-center text-black">Login</p>
        <form onSubmit={authenticateUser}>
          <div className="mb-4">
            <label htmlFor="login_id" className="block text-sm font-medium text-gray-700">
              Login ID:
            </label>
            <input
              type="text"
              id="login_id"
              value={login_id}
              onChange={(e) => setLoginId(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="text-center">
            <input
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white rounded-md"
              value="Login"
            />
          </div>
        </form>
      </div>
    );
}