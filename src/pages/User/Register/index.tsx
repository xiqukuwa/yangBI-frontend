import React, { useState } from 'react';

import {

  Button, Card,

  Form,
  Input, message,

} from 'antd';

import {userRegisterUsingPOST} from "@/services/yangbi/userController";
import {history} from "@@/core/history";



const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const Register: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: API.UserRegisterRequest) => {
    const {checkPassword,userPassword} = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
    // 注册
    const res = await userRegisterUsingPOST(values);
    if (res.code === 0) {
      const defaultRegisterSuccessMessage = '注册成功！';
      message.success(defaultRegisterSuccessMessage);
      if (!history) {
        return;
      }
      const {query} = history.location;
      history.push({
        pathname: '/user/login',
        query,
      });
      return;
    }else {
      message.error(res.message);
    }
  } catch (error) {
    const defaultRegisterFailureMessage = '登录失败，请重试！';
    console.log(error);
    message.error(defaultRegisterFailureMessage);
  }
};




return (
    <Card title={"            "}
    >
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      title='注册'
      onFinish={onFinish}
      style={{ maxWidth: 1500 }}
      scrollToFirstError
    >
      <Form.Item
        name="userAccount"
        label="用户名"
        tooltip="What do you want others to call you?"
        rules={[
          { required: true, message: '请输入你的名称!'},
          {
            min: 4,
            type: 'string',
            message: '长度不能小于4',
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="userPassword"
        label="密码"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 8,
            type: 'string',
            message: '长度不能小于8',
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="checkPassword"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            min: 8,
            type: 'string',
            message: '长度不能小于8',
          },

        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
    </Card>

  );
};

export default Register;
