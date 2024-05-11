import { Button, message } from "antd";
import { gptTest2 } from "./service";

function AIChat() {
  const handleClickChatButton = async () => {
    try {
      const stream = await gptTest2("");
      for await (const chunk of stream) {
        console.log("chunk", chunk);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div className="ai-chat-page">
      <div className="message-container"></div>
      <div className="edit-container"></div>
    </div>
  );
}

export default AIChat;
