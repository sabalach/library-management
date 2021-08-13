import React from 'react';
import {
  Statistic, Row, Col, Card,
} from 'antd';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import { GET_STATS } from '../queries';
// import { ArrowUpOutlined } from '@ant-design/icons';
function Dashboard() {
  const {
    data: { getStats: stats } = { getStats: null },
  } = useQuery(GET_STATS, {
    fetchPolicy: 'no-cache',
  });
  return (
    <Card>
      <Row gutter={16}>
        <Col span={12} style={{ paddingTop: '25px' }}>
          <Statistic title="Total Students" value={get(stats, 'totalBooks', 0)} />
        </Col>
        <Col span={12} style={{ paddingTop: '25px' }}>
          <Statistic title="Total Books" value={get(stats, 'totalStudents', 0)} />
        </Col>
        <Col span={12} style={{ paddingTop: '25px' }}>
          <Statistic title="Books Borrowed" value={get(stats, 'borrowedBooks', 0)} />
        </Col>
        {/* <Col span={12} style={{ paddingTop: '25px' }}>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Col> */}
      </Row>
    </Card>
  );
}

export default Dashboard;
