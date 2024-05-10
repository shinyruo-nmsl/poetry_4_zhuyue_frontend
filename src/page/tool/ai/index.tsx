import { Button, message } from "antd";
import { gptTest, gptTest2 } from "./service";

function AIChat() {
  const chat = async () => {
    await gptTest("", (data, close) => {
      console.log("Received data:", data);
      if (data.done) {
        close();
      }
    });
    console.log("结束会话");
    message.success("结束会话");
  };

  const chat2 = async () => {
    const stream = await gptTest2("");
    try {
      for await (const chunk of stream) {
        console.log("chunk", chunk);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return <Button onClick={chat2}>promot</Button>;
}

export default AIChat;
