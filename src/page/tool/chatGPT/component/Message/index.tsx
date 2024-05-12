import { CharacterAvatar, UserAvatar } from "../../../../../component/Avatar";

import "./index.less";

export interface Message {
  role: "gpt" | "user";
  content: string;
}

function UserMessageBox({ content }: { content: string }) {
  return (
    <div className="chat-message user">
      <div className="dialog">{content}</div>
      <UserAvatar />
    </div>
  );
}

function GPTMessageBox({ content }: { content: string }) {
  return (
    <div className="chat-message gpt">
      <CharacterAvatar characterName="A" />
      <div className="dialog">{content}</div>
    </div>
  );
}

function MessageBox({ message }: { message: Message }) {
  if (message.role === "gpt")
    return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
