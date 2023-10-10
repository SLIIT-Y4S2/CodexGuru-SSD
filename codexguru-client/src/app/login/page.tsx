"use client";
import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

type FieldType = {
  userRegNo?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const { Item } = Form;
  const { Password } = Input;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user.role === "admin") router.push("/admin");
      else if (session.user.role === "instructor") router.push("/instructor");
      else router.push("/");
    }
  }, [router, session]);

  const onFinish = async (values: any) => {
    try {
      await signIn("credentials", {
        userRegNo: values.userRegNo,
        password: values.password,
        callbackUrl: searchParams?.get("callbackUrl") || "/",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center  h-screen">
      <h1 className=" text-5xl mb-5">Login</h1>
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
          <Button
            type="primary"
            htmlType="submit"
            className="bg-color-[#FFAE00]"
          >
            Submit
          </Button>
        </Item>
        {searchParams?.get("error")}
      </Form>
    </div>
  );
};

export default Login;
