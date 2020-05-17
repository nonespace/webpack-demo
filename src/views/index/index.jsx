import React from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
export default class Index extends React.PureComponent {
  render() {
    return (
      <div>
        首页
      </div>
    );
  }
}
