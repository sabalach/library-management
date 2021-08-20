import { BulbFilled, BulbOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';

function ThemeSwitchBtn() {
  const {
    switcher, themes, currentTheme,
  } = useThemeSwitcher();

  return (
    <Switch
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
      onChange={checked => {
        switcher({
          theme: checked ? themes.light : themes.dark,
        });
      }}
      defaultChecked={currentTheme === 'light'}
    />
  );
}

export default ThemeSwitchBtn;
