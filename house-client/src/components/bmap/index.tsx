/*
 * @Author: heinan
 * @Date: 2021-07-22 17:44:57
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-22 18:00:30
 */
import { createRef, Component } from 'react';
import './bmap.css';

class index extends Component {
  static defaultProps = {
    visible: true,
  };
  mapWraper = createRef();
  componentDidMount() {
    this.init();
  }
  addMaker(point, message) {
    const marker = new BMapGL.Marker(point);
    this.map.addOverlay(marker);
    if (!message) return;

    // 创建信息窗口对象
    marker.addEventListener('click', () => {
      const myCity = new BMapGL.LocalCity();
      const opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: '地图提示框', // 信息窗口标题
        message,
      };
      myCity.get((result) => {
        const cityName = result.name;
        const infoWindow = new BMapGL.InfoWindow(
          `您当前貌似在:${cityName}`,
          opts,
        );
        this.map.openInfoWindow(infoWindow, point);
      });
      //开启信息窗口
    });
  }
  addScaleControl() {
    const scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
    this.map.addControl(scaleCtrl);
  }
  addZoomControl() {
    const zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
    this.map.addControl(zoomCtrl);
  }
  addCityListControl() {
    const cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
    this.map.addControl(cityCtrl);
  }
  getPositionByBrowser() {
    const geolocation = new BMapGL.Geolocation();
    const that = this;
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMapGL.Marker(r.point);
        that.map.addOverlay(mk);
        that.map.panTo(r.point);
        alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      } else {
        alert('failed' + this.getStatus());
      }
    });
  }
  getPositionByIP() {
    const that = this;
    function myFun(result) {
      var cityName = result.name;
      console.log(cityName);
      that.map.setCenter(cityName);
      // alert('当前定位城市:' + cityName);
      that.props.getCurrent(cityName);
    }
    var myCity = new BMapGL.LocalCity();
    myCity.get(myFun);
  }
  init() {
    // 创建百度地图实例
    this.map = new BMapGL.Map(this.mapWraper.current);
    // 创建定位坐标轴（经、纬度）
    const point1 = new BMapGL.Point(113.615354, 34.805448);
    const point2 = new BMapGL.Point(113.615354, 34.7);
    // 创建标注图标
    this.addMaker(point1);
    this.addMaker(point2, 'message2');
    // 设置中心点和缩放比例尺
    this.map.centerAndZoom(point1, 10);
    this.map.enableScrollWheelZoom(true);
    this.addScaleControl();
    this.addZoomControl();
    // this.addCityListControl();
    // this.getPositionByBrowser();
    this.getPositionByIP();
  }
  render() {
    return (
      <div
        className={this.props.visible ? 'map-wraper show' : 'map-wraper hide'}
        ref={this.mapWraper}
      ></div>
    );
  }
  componentWillMount() {
    this.map = null;
  }
}

export default index;
