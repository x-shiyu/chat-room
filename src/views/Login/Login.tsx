/** @jsxImportSource @emotion/react */
import { loginBox, submitBox, registerBtn } from "./LoginCss";
import { Form, Input, Button } from "antd";
import useLogin from "@/hooks/useLogin";

interface LoginProps {
  from?: string;
}

const rules = {
  username: [{ required: true, message: "请输入用户名!" }],
  password: [{ required: true, message: "请输入密码!" }],
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function Login({ from }: LoginProps) {
  let { onFinish, onFinishFailed, handleRegister } = useLogin(from);

  return (
    <div css={loginBox}>
      <section>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="用户名" name="username" rules={rules.username}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={rules.password}>
            <Input.Password />
          </Form.Item>
          <div css={submitBox}>
            <Button type="primary" htmlType="submit" size="large">
              登录
            </Button>
            <Button
              css={registerBtn}
              type="default"
              size="large"
              onClick={handleRegister}
            >
              注册
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
}
