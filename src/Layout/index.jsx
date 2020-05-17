import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
@withRouter
export default class Layout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Button type="primary">测试代码</Button>
        {children}
      </div>
    );
  }
}
