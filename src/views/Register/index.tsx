/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { registerBtn, submitBox, registerBox } from "./indexCss";
import { register } from "@/api/auth";
import { useHistory } from "react-router-dom";

const rules = {
  username: [{ required: true, message: "请输入用户名!" }],
  password: [{ required: true, message: "请输入密码!" }],
  email: [
    { required: true, message: "请输入邮箱!" },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: "请输入正确的邮箱",
    },
  ],
  confirmPassword: [
    { required: true, message: "请输入密码!" },
    ({ getFieldValue }: any) => ({
      validator(_: unknown, value: string) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("两次密码不一样!"));
      },
    }),
  ],
};
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

export default function Register() {
  const [form] = Form.useForm();
  const history = useHistory();
  async function handleRegister() {
    try {
      let data = await form.validateFields();
      let response = await register(data);
      if (response.code === 200) {
        message.success("注册成功！");
        setTimeout(() => {
          history.replace("/login");
        }, 300);
      } else {
        message.error(response.message);
      }
    } catch (err) {}
  }
  return (
    <div css={registerBox}>
      <section>
        <Form
          form={form}
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            validateTrigger="onBlur"
            label="用户名"
            name="username"
            rules={rules.username}
          >
            <Input />
          </Form.Item>
          <Form.Item
            validateTrigger="onBlur"
            label="邮箱"
            name="email"
            rules={rules.email}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            validateTrigger="onBlur"
            label="密码"
            name="password"
            rules={rules.password}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            validateTrigger="onBlur"
            label="重复密码"
            name="confirmPassword"
            rules={rules.confirmPassword}
          >
            <Input.Password />
          </Form.Item>
          <div css={submitBox}>
            <Button type="primary" size="large" onClick={handleRegister}>
              注册
            </Button>
            <Button
              css={registerBtn}
              type="default"
              size="large"
              onClick={() => history.push("/login")}
            >
              登录
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
}
