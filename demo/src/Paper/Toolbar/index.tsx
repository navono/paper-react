import * as React from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';

export default class Toolbar extends React.Component {
  public render() {
    return (
      <div>
        <Card style={{ width: 300 }}>
          <p>Toolbar</p>
          <p>Toolbar</p>
          <p>Toolbar</p>
        </Card>
      </div>
    );
  }
}