import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import InputSearch from "../components/InputSearch";
import Results from "../components/Results";
import useGetList, { RequestResultProps } from "../components/hooks/getData";
import { Row, Col, Divider } from "antd";
import useModal from "../components/hooks/useModal";
import { useState } from "react";
import useRequest from "../components/hooks/useRequest";

const Home: NextPage = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<number | null>(0);

  const { getRefreshedData, isLoading, response } = useGetList("/users");
  const { isModalOpen, handleCancel, handleOk, setIsModalOpen } = useModal();
  const { postData } = useRequest();

  const openView = (item: RequestResultProps["data"][0]) => {
    setCurrentItem(item.id);
    setIsEditable(false);
    setIsModalOpen(true);
  };

  const openEdit = (item: RequestResultProps["data"][0]) => {
    setCurrentItem(item.id);
    setIsEditable(true);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setIsModalOpen(true);
    setIsEditable(true);
    setCurrentItem(null);
  };

  const rescan = async (item: RequestResultProps["data"][0]) => {
    await postData({}, "GET", `/users/${item?.id}/rescan`);
    await getRefreshedData(0, "");
  };

  const deleteItem = async (item: RequestResultProps["data"][0]) => {
    await postData({}, "DELETE", `/users/${item?.id}`);
    await getRefreshedData(0, "");
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col>
          <InputSearch getRefreshedData={getRefreshedData} openNew={openNew} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col>
          <Results
            results={response}
            isLoading={isLoading}
            getRefreshedData={getRefreshedData}
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            handleOk={handleOk}
            setIsModalOpen={setIsModalOpen}
            isEditable={isEditable}
            currentItem={currentItem}
            openView={openView}
            openEdit={openEdit}
            deleteItem={deleteItem}
            rescan={rescan}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
