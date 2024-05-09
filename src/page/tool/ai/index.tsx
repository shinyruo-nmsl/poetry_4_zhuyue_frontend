import { Button, message } from "antd";
import { gptTest, gptTest2 } from "./service";

function AIChat() {
  const chat = async () => {
    await gptTest("", (data) => {
      console.log("Received data:", data);
    });
    message.success("结束会话");
  };

  const chat2 = () => {
    const eventSource = gptTest2();

    eventSource.addEventListener("message", (event) => {
      const data = event.data;
      console.log("Received data:", event);
      if (!data) {
        console.log("关闭");
        eventSource.close();
      }
    });

    eventSource.addEventListener("error", (error) => {
      console.error("Error occurred:", error);
    });

    eventSource.addEventListener("open", () => {
      console.log("Connection opened");
    });

    eventSource.addEventListener("close", () => {
      console.log("Connection closed");
    });
  };

  return <Button onClick={chat2}>promot</Button>;
}

export default AIChat;
