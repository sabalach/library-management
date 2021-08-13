import React, { useState, useCallback } from 'react';
import { Card, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import IdCardModal from '../components/IdCardModal';
import { GET_STUDENTS } from '../queries';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function IdCards() {
  const [currentIdCard, setCurrentIdCard] = useState(null);
  const {
    data: { getStudents: students } = { getStudents: null },
  } = useQuery(GET_STUDENTS);

  const handleClick = useCallback(async () => {
    if (!students) {
      return;
    }
    await students.reduce(async (memo, student) => {
      await memo;
      setCurrentIdCard(student);
      await sleep(1000);
    }, undefined);
  }, [students]);

  return (
    <>
      <br />
      <Card>
        <Button
          onClick={handleClick}
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size="large"
        >
          Generate All ID Card
        </Button>
        <IdCardModal
          autoDownload
          currentIdCard={currentIdCard}
          setCurrentIdCard={setCurrentIdCard}
          showDownloadBtn={false}
        />
      </Card>
    </>
  );
}

export default IdCards;
