import React, { useEffect, useRef } from 'react';
import { Modal, Button, message } from 'antd';
import Barcode from 'react-barcode';
import get from 'lodash/get';
import { useQuery } from '@apollo/client';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';
import { DownloadOutlined } from '@ant-design/icons';
import { Textfit } from 'react-textfit';
import styles from './index.module.css';
import { GET_CONFIG } from '../../queries';

function IdCardModal({
  currentIdCard,
  setCurrentIdCard,
  showDownloadBtn = true,
  autoDownload = false,
}) {
  const handleOk = () => {
    setCurrentIdCard(null);
  };

  const handleCancel = () => {
    setCurrentIdCard(null);
  };

  const {
    data: { getConfig: config } = { getConfig: null },
  } = useQuery(GET_CONFIG);

  const idCardEl = useRef(null);

  const handleDownload = () => {
    if (!currentIdCard) {
      return;
    }
    message.loading({
      key: `idcarddownload${get(currentIdCard, 'serialNumber', '')}`,
      content: `${get(currentIdCard, 'level.abbreviation', '')}${get(currentIdCard, 'department.abbreviation', '')}${get(currentIdCard, 'serialNumber', '')} Downloading`,
    });
    toJpeg(idCardEl.current, { pixelRatio: 3, cacheBust: true })
      .then((dataUrl) => {
        message.success({
          key: `idcarddownload${get(currentIdCard, 'serialNumber', '')}`,
          content: `${get(currentIdCard, 'level.abbreviation', '')}${get(currentIdCard, 'department.abbreviation', '')}${get(currentIdCard, 'serialNumber', '')} Downloaded`,
        });
        download(dataUrl, `${get(currentIdCard, 'level.abbreviation', '')}${get(currentIdCard, 'department.abbreviation', '')}${get(currentIdCard, 'serialNumber', '')}.jpg`);
      });
  };

  useEffect(() => {
    if (autoDownload) {
      handleDownload();
    }
  }, [currentIdCard, autoDownload]);

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
      visible={!!currentIdCard}
      onOk={handleOk}
      style={{ top: 20 }}
      onCancel={handleCancel}
      bodyStyle={{
        position: 'relative',
        height: '145mm',
      }}
    >
      <div
        className={styles.container}
      >
        <div
          ref={idCardEl}
          className={styles.card}
        >
          <img
            src={`/img/${get(currentIdCard, 'photo', '')}`}
            alt="Avatar"
            className={styles.avatar}
          />
          <table className={styles.info}>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{get(currentIdCard, 'name', '')}</td>
              </tr>
              {/* <tr>
                <td>Gender:</td>
                <td>{get(currentIdCard, 'gender', '')}</td>
              </tr> */}
              <tr>
                <td>Department:</td>
                <td>{get(currentIdCard, 'department.name', '')}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{get(currentIdCard, 'address', '')}</td>
              </tr>
              <tr>
                <td>DOB:</td>
                <td>{get(currentIdCard, 'dob', '')}</td>
              </tr>
              <tr>
                <td>Valid Upto:</td>
                <td>{get(currentIdCard, 'validUpto', '')}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.barcode}>
            <Barcode
              value={get(currentIdCard, 'serialNumber', '')}
              // width={2.15}
              height={40}
              fontSize={12.8}
              margin={9.6}
            />
          </div>

          <div className={styles.footer}>
            <div>
              <div>
                <img
                  src="/logo.png"
                  className={styles.logo}
                  alt=""
                />
              </div>
              <div>
                <p className={styles.footertext}>
                  <Textfit style={{ height: '9mm' }} mode="multi">
                    {get(config, 'institutionName', '')}
                  </Textfit>
                  <Textfit max={12} mode="single">
                    {get(config, 'institutionContact', '')}
                  </Textfit>
                  <Textfit max={12} mode="single">
                    {get(config, 'institutionLocation', '')}
                  </Textfit>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default IdCardModal;
