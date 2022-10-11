import { PlusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";

interface InputSearchProps {
  getRefreshedData: (page?: number, name?: string) => Promise<void>;
  openNew: () => void;
}

const InputSearch = ({ getRefreshedData, openNew }: InputSearchProps) => {
  const [form] = useForm();

  const onFinish = async (values: { search: string }) => {
    const { search } = values;

    await getRefreshedData(0, search);

    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="search"
      initialValues={{ search: "" }}
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item
        label="Search"
        name="search"
        rules={[{ min: 3, message: "Please enter query to search" }]}
      >
        <Input
          style={{ width: 200 }}
          autoFocus
          ref={(input) => input && input.focus()}
        />
      </Form.Item>

      <Form.Item>
        <Button type="default" htmlType="submit">
          Search
        </Button>
      </Form.Item>
      <Button
        type="primary"
        onClick={() => {
          openNew();
        }}
      >
        New <PlusCircleOutlined />
      </Button>
    </Form>
  );
};

export default InputSearch;
