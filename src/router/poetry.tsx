import { SubRoute } from "../global-type/router";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";

import { PoetrySearch } from "../page/poetry";

const subRouter: SubRoute = {
  path: "poetry",
  label: "诗词接花",
  key: "poetry",
  icon: <MailOutlined />,
  children: [
    {
      path: "search",
      label: "诗词检索",
      key: "poetry_search",
      auths: ["admin", "ordinary"],
      icon: <AppstoreOutlined />,
      element: <PoetrySearch />,
    },
  ],
};

export default subRouter;
