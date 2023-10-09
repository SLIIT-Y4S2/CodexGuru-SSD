import React from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LikeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

const ReportStatistics = () => (
  <Row gutter={12}>
    <Col span={12}>
      <Statistic
        title="Attempts"
        value={1128}
        prefix={<TeamOutlined />}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </Col>
    <Col span={12}>
      <Statistic title="Average" value={45} />
    </Col>
    <Col span={12}>
      <Statistic
        title="Active"
        value={11.28}
        precision={2}
        valueStyle={{
          color: "#3f8600",
        }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Col>{" "}
    <Col span={12}>
      <Statistic
        title="Idle"
        value={9.3}
        precision={2}
        valueStyle={{
          color: "#cf1322",
        }}
        prefix={<ArrowDownOutlined />}
        suffix="%"
      />
    </Col>
  </Row>
);
export default ReportStatistics;
