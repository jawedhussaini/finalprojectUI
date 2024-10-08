import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons

import { getToken, getUserData, setToken, setUserAllData } from "../utill/helpers";
import { useAuthContext } from "../context/authContext";
import { GloblaContext } from "../context";

const SignIn = () => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { setUserPOsition } = useContext(GloblaContext);
  const [showPassword, setShowPassword] = useState(false); // Change variable name to showPassword

  const { setUser } = useAuthContext();

  const onFinish = async () => {
    setLoading(true);
    try {
      const value = {
        identifier: email,
        password: password
      };

      const response = await fetch(`${API}/auth/local?populate=*`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value)
      });

      const data = await response.json();
      if (data?.error) {
        setLoading(false);
        message.error(`Invalid Password or Email`);
        throw data?.error;
      } else {
        setLoading(false);
      await  setToken(data.jwt);
      await  setUser(data.user);
      await  setUserAllData(data.user);
        message.success(`Welcome back, ${data.user.username}`);
        {data.user.positiion==="sporter" &&  fetchPayments()}
       
  
        navigate("/tables", { replace: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



   async function fetchPayments(){

    try {
      const user = getUserData()
       const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Add 1 because getMonth() returns a zero-based index

    // Ensure month is two digits
    const monthStr = month.toString().padStart(2, "0");

    // Calculate the first day of the month
    const startDate = `${year}-${monthStr}-01T00:00:00.000Z`;

    // Calculate the last day of the month
    const lastDay = new Date(year, month, 0).getDate(); // No need to add 1, getDate() gives us the last day
    const endDate = `${year}-${monthStr}-${lastDay}T23:59:59.999Z`;
      
      const payments = await fetch(`${API}/payments?[filters][Email][$eq]=${email}&[filters][createdAt][$gte]=${startDate}&[filters][createdAt][$lte]=${endDate}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!payments.ok) {
        throw new Error(payments.status);
      }

      const pay = await payments.json()
      console.log("pays",pay)

      {pay?.data.length=== 0 && sendemail()}


   

    } catch (error) {
   
      console.error("Error fetching posts:", error);
      throw error;
    }
   }

     async function sendemail(){
         const user = getUserData()
    try {
      const response = await fetch('http://localhost:1337/api/email-test/exampleAction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
             
        },
        body: JSON.stringify({
          input: `dear ${user.name} please complete your payment in this month`,
        emailTo: "taha.hussaini125@gmail.com"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || 'Failed to sign up.');
      }
    } catch (error) {
      console.log(error)
    }

    }
  
  


  return (
    <>
      <div className="min-h-screen w-full h-full bg-gray-100 text-gray-900 flex justify-center">
        <div className="m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Sign In
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="my-12 border-b text-center">
                  <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Sign In with E-mail
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} />

                  <div className="relative mt-5">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? "text" : "password"} // Toggle password visibility
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)} />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-6 text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <button
                    onClick={onFinish}
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">
                      {loading ? "Sign In  ..." : "Sign In"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')] xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            >
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
