import MarkDown from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";

import { CharacterAvatar, UserAvatar } from "../../../../../component/Avatar";

import "./index.less";

export interface Message {
  role: "gpt" | "user";
  content: string;
}

const getCodeTemplate = (code: string) => {
  return `<div class="hl-code"><div class="hl-code-header"></div><div class="hljs"><code>${code}</code></div></div>`;
};

const markdown: MarkDown = MarkDown({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return getCodeTemplate(
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        );
      } catch (err) {
        console.log(err);
      }
    }
    return getCodeTemplate(markdown.utils.escapeHtml(str));
  },
});

function UserMessageBox({ content }: { content: string }) {
  return (
    <div className="chat-message user">
      <div className="dialog">{content}</div>
      <UserAvatar />
    </div>
  );
}

function GPTMessageBox({ content }: { content: string }) {
  const html = markdown.render(content);

  return (
    <div className="chat-message gpt">
      <CharacterAvatar characterName="A" />
      <div className="dialog" dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

function MessageBox({ message }: { message: Message }) {
  if (message.role === "gpt")
    return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
