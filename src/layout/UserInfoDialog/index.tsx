import { Modal, Form, Upload, Button, Input, message, UploadFile } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { UserLoginDisplayInfo } from "../../global-type/user";
import UserAvatar from "../../component/UserAvatar";
import { useState } from "react";
import { formatUserRole } from "../../service/user";

interface UserInfoDialogProps extends UserLoginDisplayInfo {
  visible: boolean;
  onConfirm: (info: UserLoginDisplayInfo) => void;
  onCloseModal: () => void;
}

function UserInfoDialog({
  visible,
  avatar,
  userName,
  role,
  onConfirm,
  onCloseModal,
}: UserInfoDialogProps) {
  const [_userName, setUserName] = useState(userName);
  const [_avatar, setAvatar] = useState(avatar);

  const handleBeforeUploadAvatar = async (file: File) => {
    if (file.size > 1024 * 1024 * 10) {
      message.warning("文件太大啦~");
      return false;
    }

    return true;
  };

  const handleUploadAvatar = async (uploadFile: UploadFile) => {
    const file = uploadFile.originFileObj!;

    if (uploadFile.status === "uploading") {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleClickConfirmButton = () => {
    onConfirm({ userName: _userName, avatar: _avatar, role });
  };

  return (
    <Modal
      open={visible}
      title="用户信息调整"
      centered
      cancelText="取消"
      okText="确认"
      onCancel={onCloseModal}
      onOk={handleClickConfirmButton}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="用户头像">
          <div
            className="avatar-form-item"
            style={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
          >
            <UserAvatar userName={_userName} avatar={_avatar} size={50} />
            <Upload
              accept="image/png, image/jpeg"
              beforeUpload={handleBeforeUploadAvatar}
              customRequest={() => {}}
              onChange={({ file }) => handleUploadAvatar(file)}
              itemRender={() => <></>}
            >
              <Button size="small" icon={<UploadOutlined />}>
                点击上传
              </Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item label="用户昵称">
          <Input
            size="large"
            placeholder="请输入您的昵称~"
            value={_userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="角色">
          <Input
            size="large"
            disabled
            prefix={<UserOutlined />}
            value={formatUserRole(role)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserInfoDialog;
