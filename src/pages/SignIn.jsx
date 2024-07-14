import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Typography,
  Form,
  Input,
  message,
} from "antd";

import { getToken, setToken } from "../utill/helpers";
import { useAuthContext } from "../context/authContext";



function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;




const SignIn = () => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API;
  const [loading,setLoading]=useState(false)

  const { setUser } = useAuthContext();

  // const [ error, setError ] = useState("");

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const value = {
        identifier: values.email,
        password: values.password
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
      <Layout className="layout-default layout-signin" style={{ height: '100vh', background:"black" }}>
        <Content className="signin" >

          <div className="sign-in-container">

          <Title className="mb-15" style={{ color:"rgb(127, 31, 32)"}}>Sign In</Title>
          <Title className="font-regular text-muted" style={{ color:"rgb(127, 31, 32)"}} level={5}>
            Enter your email and password to sign in
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="username"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              className="username"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: "100%",color:"white",background:"rgb(127, 31, 32)"}}
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
          
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default SignIn;