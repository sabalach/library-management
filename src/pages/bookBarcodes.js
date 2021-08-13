import React, { useState, useCallback } from 'react';
import { Card, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import BookBarcodeModal from '../components/BookBarcodeModal';
import { GET_BOOKS } from '../queries';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function IdCards() {
  const [currentBookBarcode, setCurrentBookBarcode] = useState(null);
  const {
    data: { getBooks: books } = { getBooks: null },
  } = useQuery(GET_BOOKS);

  const handleClick = useCallback(async () => {
    if (!books) {
      return;
    }
    await books.reduce(async (memo, book) => {
      await memo;
      setCurrentBookBarcode(book);
      await sleep(1000);
    }, undefined);
  }, [books]);

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
          Generate All Book Barcodes
        </Button>
        <BookBarcodeModal
          autoDownload
          currentBookBarcode={currentBookBarcode}
          setCurrentBookBarcode={setCurrentBookBarcode}
          showDownloadBtn={false}
        />
      </Card>
    </>
  );
}

export default IdCards;
