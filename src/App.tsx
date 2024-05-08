import Layout from "./layout";
import { HttpEventEmitter } from "./util/http";
import "./App.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => navigate("/login");
    HttpEventEmitter.registHandler("code_401", handler);

    return () => HttpEventEmitter.removeHandler("code_401", handler);
  });

  return <Layout></Layout>;
}

export default App;
