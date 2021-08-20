import { BulbFilled, BulbOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';

function ThemeSwitchBtn() {
  const {
    switcher, themes, currentTheme, status,
  } = useThemeSwitcher();
  console.log({ currentTheme });
  return (
    <Switch
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
      onChange={checked => {
        switcher({
          theme: checked ? themes.light : themes.dark,
        });
        localStorage.setItem('theme', checked ? 'light' : 'dark');
      }}
      checked={currentTheme === 'light'}
      loading={status === 'loading'}
    />
  );
}

export default ThemeSwitchBtn;
