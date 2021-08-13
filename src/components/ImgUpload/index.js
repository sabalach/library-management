/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    console.log({ props });

    this.state = {
      imageUrl: '',
    };
  }

  componentDidUpdate(prevProps) {
    console.log({ pprops: this.props });
    if (typeof this.props.value === 'string' && this.props.value !== prevProps.value) {
      this.setState({
        imageUrl: `/img/${this.props.value}`,
      });
    }
  }

  handleChange = info => {
    // if (info.file.status === 'uploading') {
    //   return;
    // }
    // if (info.file.status === 'done') {
    // Get this url from response in real world.
    this.props.onChange(info.file.originFileObj);

    getBase64(info.file.originFileObj, imageUrl => this.setState({
      imageUrl,
    }));
    // }
  };

  render() {
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={() => true}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default ImageUpload;
