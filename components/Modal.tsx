import { SecurityScanOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal as AntdModal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { RequestResultProps } from "./hooks/getData";
import useRequest from "./hooks/useRequest";

interface ModalProps {
  handleCancel: () => void;
  handleOk: () => void;
  isModalOpen: boolean;
  current: RequestResultProps["data"][0];
  isEditable: boolean;
  getRefreshedData: (page?: number, name?: string) => Promise<void>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  rescan: (item: any) => Promise<void>;
}

const Modal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  current,
  isEditable,
  getRefreshedData,
  setIsModalOpen,
  rescan,
}: ModalProps) => {
  const [form] = useForm();
  const { postData } = useRequest();

  useEffect(() => {
    form.resetFields();
  }, [form, current]);

  const onFinish = async (values: RequestResultProps["data"][0]) => {
    if (!isEditable) return;

    const isNew = current == null;
    const method = isNew ? "POST" : "PATCH";
    const route = isNew ? "/users" : `/users/${current?.id}`;
    await postData(values, method, route);

    await getRefreshedData(0, "");
    setIsModalOpen(false);
    form.resetFields();
  };

  const rescanFunc = useCallback(async () => {
    await rescan(current);
  }, [current, rescan]);

  return (
    <AntdModal
      title={current?.name || "New"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        name="profile"
        initialValues={current}
        onFinish={onFinish}
        layout="horizontal"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ min: 3, message: "Please enter a valid name" }]}
        >
          <Input
            autoFocus
            ref={(input) => input && input.focus()}
            disabled={!!!isEditable}
          />
        </Form.Item>
        <Form.Item
          label="Github user"
          name="githubUser"
          rules={[{ min: 3, message: "Please enter a valid Github User" }]}
        >
          <Input disabled={!!!isEditable} />
        </Form.Item>
        <Form.Item label="Followers" name="quantityFollowers">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Following" name="quantityFollowing">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Stars" name="quantityStars">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Contributions(last year)"
          name="lastYearContributions"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="Organization" name="organization">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Location" name="localization">
          <Input disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {isEditable && (
            <Button type="primary" htmlType="submit">
              {current ? "Edit" : "Save"}
            </Button>
          )}
          <Button type="dashed" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={rescanFunc}>
            Rescan <SecurityScanOutlined />
          </Button>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};

export default Modal;
