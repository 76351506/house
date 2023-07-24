/*
 * @Author: heinan
 * @Date: 2021-07-19 16:40:26
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-19 16:41:12
 */
import { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';

class Banner extends Component {
  state = {
    data: [],
    imgHeight: 176,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [
          'AiyWuByWklrrUDlFignR',
          'TekJlZRVCjLFexlOCuWn',
          'IJOtIlfsYdTyaDTRVrLI',
        ],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={(index) => console.log('slide to', index)}
        >
          {this.state.data.map((val) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight,
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default Banner;
