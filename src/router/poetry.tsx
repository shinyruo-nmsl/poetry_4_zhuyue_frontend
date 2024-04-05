import { SubRoute } from "../global-type/router";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";

import { PoetrySearch, PoetryUpload } from "../page/poetry";

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
      icon: <AppstoreOutlined />,
      element: <PoetrySearch />,
    },
    {
      path: "upload",
      label: "诗词上传",
      key: "poetry_upload",
      icon: <AppstoreOutlined />,
      element: <PoetryUpload />,
    },
  ],
};

export default subRouter;
