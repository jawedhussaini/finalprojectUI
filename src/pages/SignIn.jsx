import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Typography,
  Form,
  Input,
  message,
} from "antd";

import { getToken, setToken, setUserAllData } from "../utill/helpers";
import { useAuthContext } from "../context/authContext";
import { GloblaContext } from "../context";



function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;




const SignIn = () => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API;
  const [loading,setLoading]=useState(false)
  const [email,setEmail]=useState(null)
  const [password,setPassword]=useState(null)
  const {  setUserPOsition } = useContext(GloblaContext);

  const { setUser } = useAuthContext();

  // const [ error, setError ] = useState("");

  const onFinish = async () => {
    setLoading(true)
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
         message.error(`Envalid Password or Email`);
        throw data?.error;
       
      } else {
        setToken(data.jwt);
        setUser(data.user);
        setUserAllData(data.user)
        console.log(data.user)
        message.success(`Welcome back, ${data.user.username}`);
        navigate("/tables", { replace: true });
      }
    } catch (error) {
      console.log(error);
      // setError(error?.message ?? "Something went wrong.");
    }
    finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    <div class="min-h-screen w-full h-full bg-gray-100 text-gray-900 flex justify-center">
    <div class="m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
           
            <div class="mt-12 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Sign IN
                </h1>
                <div class="w-full flex-1 mt-8">
                 

                    <div class="my-12 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            sign IN with E-mail
                        </div>
                    </div>

                    <div class="mx-auto max-w-xs">
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email"
                            onChange={(e)=>setEmail(e.target.value)} />
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)} />
                        <button
                        onClick={onFinish}
                            class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-3">
                                Sign Ip
                            </span>
                        </button>
                     
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div class="m-12 bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')] xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              >
            </div>
        </div>
    </div>
</div>
    </>
  );
}

export default SignIn;