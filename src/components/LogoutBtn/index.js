import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

function LogoutBtn() {
  const router = useRouter();
  return (
    <>
      {router.route === '/login' || (
      <Tooltip title="Log out">
        <Button
          onClick={() => {
            localStorage.removeItem('token');
            router.push({
              pathname: '/login',
              query: {
                ...(router.route !== '/' ? { fwd: router.route } : {}),
              },
            });
          }}
          danger
          shape="circle"
          icon={<PoweroffOutlined />}
        />
      </Tooltip>
      )}
    </>
  );
}

export default LogoutBtn;
