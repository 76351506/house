/*
 * @Author: heinan
 * @Date: 2021-07-22 17:48:13
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-22 18:01:53
 */
import React, { Component } from 'react';
import BMap from '@/components/bmap';

class SecondHand extends Component {
  onGetCurent(val) {
    console.log('当前定位城市:' + val);
  }
  render() {
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        this is SecondHand
        <BMap
          visible={false}
          getCurrent={(val) => this.onGetCurent(val)}
        ></BMap>
      </div>
    );
  }
}

export default SecondHand;
