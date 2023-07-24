/*
 * @Author: heinan
 * @Date: 2021-07-16 11:33:09
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-22 17:35:55
 */

import { Component, createRef } from 'react';
import { inject, observer } from 'mobx-react';
import Scroller from '@/components/scroller';
import './firsthand.css';

@inject('app')
@observer
class FirstHand extends Component {
  scrollerRef = createRef();
  state = {
    current: 'A',
  };
  async componentDidMount() {
    await this.props.app.getCityList();
    this.scrollerRef.current.refresh();
  }
  scroll2Element(ele) {
    this.scrollerRef.current.scroll2Element(ele);
  }

  render() {
    return (
      <div className="content-wraper">
        <div className="child-wraper">
          <h1>FirstHand page</h1>
          <div className="scroll-bar mt25">
            <Scroller refName="scrollBar" scrollbar={false}>
              {this.props.app.cityList.map((city) => {
                return (
                  <li
                    className={
                      city.title === this.state.current
                        ? 'hand current'
                        : 'hand'
                    }
                    key={city.title}
                    onClick={() => {
                      this.setState({
                        current: city.title,
                      });
                      this.scroll2Element(`list-${city.title}`);
                    }}
                  >
                    {city.title}
                  </li>
                );
              })}
            </Scroller>
          </div>

          <Scroller refName="cityList" ref={this.scrollerRef} top={30}>
            {this.props.app.cityList.map((city) => {
              return (
                <dl className="p15" key={city.title}>
                  <h3 className={`list-${city.title}`}>{city.title}</h3>
                  <ul>
                    {city.lists.map((country, index) => {
                      return (
                        <li className="inline-block bd1 mlr5 plr5" key={index}>
                          {country}
                        </li>
                      );
                    })}
                  </ul>
                </dl>
              );
            })}
          </Scroller>
        </div>
      </div>
    );
  }
}

export default FirstHand;
