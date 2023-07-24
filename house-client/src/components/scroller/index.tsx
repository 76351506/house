/*
 * @Author: heinan
 * @Date: 2021-07-22 15:54:32
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-22 17:36:37
 */
import { Component } from 'react';
import BScroll from 'better-scroll';
import './scroller.css';

class Scroller extends Component<any, any> {
  static defaultProps = {
    scrollbar: true,
    top: 25,
    bottom: 0,
  };
  componentDidMount() {
    this.scroller = new BScroll(this.refs[this.props.refName], {
      scrollbar: this.props.scrollbar,
      bounce: true,
      probeType: 1,
    });
  }
  refresh() {
    this.scroller.refresh();
  }
  scroll2Element(ele) {
    this.scroller.scrollToElement(`.${ele}`);
  }
  render() {
    return (
      <div
        ref={this.props.refName}
        className="scroller-wraper"
        style={{ top: this.props.top, bottom: this.props.bottom }}
      >
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Scroller;
