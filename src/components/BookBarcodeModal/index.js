import React, { useEffect, useRef } from 'react';
import {
  Modal, Typography, Button, message,
} from 'antd';
import Barcode from 'react-barcode';
import get from 'lodash/get';
import { DownloadOutlined } from '@ant-design/icons';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { useQuery } from '@apollo/client';
import { GET_CONFIG } from '../../queries';

const { Title } = Typography;

function BookBarcodeModal({
  currentBookBarcode,
  setCurrentBookBarcode,
  autoDownload = false,
  showDownloadBtn = true,
}) {
  const {
    data: { getConfig: config } = { getConfig: null },
  } = useQuery(GET_CONFIG);
  const handleOk = () => {
    setCurrentBookBarcode(null);
  };

  const handleCancel = () => {
    setCurrentBookBarcode(null);
  };

  const barcodeEl = useRef(null);

  const handleDownload = () => {
    if (!currentBookBarcode) {
      return;
    }
    message.loading({
      key: `bookbcdown${get(currentBookBarcode, 'serialNumber', '')}`,
      content: `Downloading ${get(currentBookBarcode, 'name', '')}`,
    });
    toPng(barcodeEl.current, { pixelRatio: 3, cacheBust: true })
      .then((dataUrl) => {
        message.success({
          key: `bookbcdown${get(currentBookBarcode, 'serialNumber', '')}`,
          content: `Downloaded ${get(currentBookBarcode, 'name', '')}`,
        });
        download(dataUrl, `${get(currentBookBarcode, 'name', '')}.png`);
      });
  };

  useEffect(() => {
    if (autoDownload && config) {
      handleDownload();
    }
  }, [autoDownload, currentBookBarcode, config]);

  return (
    <Modal
      title={null}
      footer={showDownloadBtn ? [
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
        >
          Download
        </Button>,
      ] : null}
      visible={!!currentBookBarcode}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {/* <p>{JSON.stringify(currentBookBarcode)}</p> */}
      <div
        ref={barcodeEl}
        style={{ textAlign: 'center', backgroundColor: '#fff' }}
      >
        <Title level={4} style={{ margin: 0, padding: 0, color: '#000' }}>{get(currentBookBarcode, 'name', '')}</Title>
        <Barcode value={`${get(config, 'institutionAbb', '')}${get(currentBookBarcode, 'serialNumber', '')}`} />
      </div>
    </Modal>
  );
}

export default BookBarcodeModal;
