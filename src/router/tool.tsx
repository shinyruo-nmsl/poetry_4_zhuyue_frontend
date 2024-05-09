import { SubRoute } from "../global-type/router";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";

import { AIChat } from "../page/tool";

const subRouter: SubRoute = {
  path: "tool",
  label: "实用工具",
  key: "tool",
  icon: <MailOutlined />,
  children: [
    {
      path: "ai",
      label: "gpt",
      key: "tool_ai",
      icon: <AppstoreOutlined />,
      element: <AIChat />,
    },
  ],
};

export default subRouter;
