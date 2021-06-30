import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { login } from "@/api/auth";
import { setToken } from "@/utils/storage";
import { AtomLogin } from "@/atoms/AuthStatus";

interface LoginForm {
  username: string;
  password: string;
}
export default function useLogin(from: string | undefined) {
  let history = useHistory();
  let [isLogin, setIsLogin] = useRecoilState(AtomLogin);

  useEffect(() => {
    if (from && from !== "/login") {
      history.push(from);
    } else {
      history.push("/chat");
    }
  }, [isLogin]);

  const onFinish = (values: LoginForm) => {
    login(values.username, values.password)
      .then((data) => {
        setToken(data.token + "/" + data.expire);
        setIsLogin(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleRegister = () => {
    history.push("/register");
  };

  return {
    onFinish,
    onFinishFailed,
    handleRegister,
  };
}
