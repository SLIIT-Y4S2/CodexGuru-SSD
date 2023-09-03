"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";

type FieldType = {
  userRegNo?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const { Item } = Form;
  const { Password } = Input;

  const { login } = useLogin();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await login(values.userRegNo, values.password);
      if (response.role === "admin") router.push("/admin");
      else if (response.role === "instructor") router.push("/instructor");
      else router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center  h-screen">
      <h1 className="text-fuchsia-500 text-lg mb-5">Temp Login</h1>
      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <Item<FieldType>
          label="Student registration number"
          name="userRegNo"
          rules={[
            {
              required: true,
              message: "Please input your registration number !",
            },
          ]}
        >
          <Input />
        </Item>

        <Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Password />
        </Item>

        <Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default Login;
