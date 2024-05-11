import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import Layout from "./layout";
import { HttpEventEmitter } from "./util/http";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const { confirm } = Modal;

  useEffect(() => {
    const handler = () => {
      confirm({
        title: "尚未登录",
        icon: <ExclamationCircleFilled />,
        content: "使用此功能需要登录",
        okText: "去登录",
        cancelText: "取消",
        onOk() {
          navigate("/login");
        },
        onCancel() {
          // noop
        },
      });
    };
    HttpEventEmitter.registHandler("code_401", handler);

    return () => HttpEventEmitter.removeHandler("code_401", handler);
  });

  return <Layout />;
}

export default App;
