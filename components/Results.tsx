import { SecurityScanOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import { Dispatch, SetStateAction, useMemo } from "react";
import { RequestResultProps } from "./hooks/getData";
import useRequest from "./hooks/useRequest";
import Modal from "./Modal";

interface ResultsProps {
  results: RequestResultProps;
  isLoading: boolean;
  getRefreshedData: (page?: number, name?: string) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOk: () => void;
  handleCancel: () => void;
  isEditable: boolean;
  currentItem: number | null;
  openView: (item: any) => void;
  openEdit: (item: any) => void;
  deleteItem: (item: any) => Promise<void>;
  rescan: (item: any) => Promise<void>;
}

const Results = ({
  results,
  isLoading,
  getRefreshedData,
  isModalOpen,
  handleCancel,
  handleOk,
  setIsModalOpen,
  isEditable,
  currentItem,
  openView,
  openEdit,
  deleteItem,
  rescan,
}: ResultsProps) => {
  const { postData } = useRequest();
  const current = useMemo(
    () => results?.data?.filter((item) => item.id === currentItem),
    [currentItem, results.data]
  );

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (imgUrl: string) =>
        imgUrl && <img src={imgUrl} style={{ maxWidth: 50 }} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Github user",
      dataIndex: "githubUser",
      key: "githubUser",
      render: (userName: string) => (
        <a
          href={`https://github.com/${userName}`}
          target="_blank"
          rel="noreferrer"
        >
          {userName}
        </a>
      ),
    },
    {
      title: "Followers",
      dataIndex: "quantityFollowers",
      key: "quantityFollowers",
    },
    {
      title: "Following",
      dataIndex: "quantityFollowing",
      key: "quantityFollowing",
    },
    {
      title: "Stars",
      dataIndex: "quantityStars",
      key: "quantityStars",
    },
    {
      title: "Contributions(last year)",
      dataIndex: "lastYearContributions",
      key: "lastYearContributions",
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "Location",
      dataIndex: "localization",
      key: "localization",
    },
    {
      title: "Action",
      key: "action",
      render: (item: RequestResultProps["data"][0]) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => {
              openView(item);
            }}
          >
            View
          </Button>
          <Button
            type="primary"
            onClick={() => {
              openEdit(item);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              rescan(item);
            }}
          >
            Rescan <SecurityScanOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={async () => {
              await deleteItem(item);
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>DELETE</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
        current={current?.[0]}
        isEditable={isEditable}
        getRefreshedData={getRefreshedData}
        setIsModalOpen={setIsModalOpen}
        rescan={rescan}
      />
      <Table
        dataSource={results?.data}
        columns={columns}
        loading={isLoading}
        bordered
        rowKey="id"
        pagination={{
          defaultCurrent: results?.meta?.page,
          total: results?.meta?.count,
          pageSize: 10,
          onChange: (page, pageSize) => {
            getRefreshedData(page);
          },
        }}
      />
    </>
  );
};

export default Results;
