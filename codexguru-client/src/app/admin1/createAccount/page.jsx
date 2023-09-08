"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';

const { Option } = Select;

const AccountCreationForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    // Simulate API call (replace with actual API call)
    try {
      // Replace the following with your actual API endpoint and request
      const response = await fetch('http://localhost:5000/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        notification.success({
          message: 'Account Created',
          description: 'Account has been created successfully.',
        });
        window.location.reload();
      } else {
        notification.error({
          message: 'Account Creation Failed',
          description: 'There was an error creating your account. Please try again later.',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      notification.error({
        message: 'API Error',
        description: 'There was an error connecting to the server. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateRegistrationNumber = (_, value) => {
    // Check if registration number follows the specified pattern
    const pattern = /^[A-Za-z]{2}\d{1,8}$/;
    if (!pattern.test(value)) {
      return Promise.reject('Invalid registration number');
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (value.length < 5) {
      return Promise.reject('Password must be at least 5 characters long');
    }
    return Promise.resolve();
  };

  return (
    <Form
      name="account-creation"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{height:450}}
    >
      <Form.Item
        name="userRegNo"
        label="Student Registration Number"
        rules={[
          {
            required: true,
            message: 'Please enter your registration number!',
          },
          {
            validator: validateRegistrationNumber,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please enter your first name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'Please enter your last name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please enter your password!',
          },
          {
            validator: validatePassword,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Please select your role!',
          },
        ]}
      >
        <Select placeholder="Select a role">
          <Option value="student">Student</Option>
          <Option value="instructor">Instructor</Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button style={{marginTop:50}}type="primary" htmlType="submit" loading={loading}>
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountCreationForm;
