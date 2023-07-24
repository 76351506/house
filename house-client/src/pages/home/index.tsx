/*
 * @Author: heinan
 * @Date: 2021-07-16 12:12:02
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-19 17:06:10
 */
import { FC, useState, useEffect } from 'react';
import styles from './index.scss';
import { _getBannerList, _getMealInfoList, _getUsreList } from '@/api/home';
import '@/../mock/';
import Banner from '@/components/banner';
import List from '@/components/List';

const IndexPage: FC = function (props) {
  const [bannerList, setBannerList] = useState([]);

  // useEffect第二个参数没有写,默认监听所有数据变化
  // useEffect第二个参数[],执行一次
  // useEffect第二个参数[...state]监听数组中变量的改变
  useEffect(() => {
    async function getUsreList() {
      const result: any = await _getUsreList();
      console.log(result);
    }
    async function getBannerList() {
      const result: any = await _getBannerList();
      setBannerList(result.data.currentUser);
    }
    async function getMealInfoList() {
      const result: any = await _getMealInfoList();
      setBannerList(result.data.currentUser);
    }
    getUsreList();
    // getBannerList();
    // getMealInfoList();
    // let timer:any = setInterval(() => {}, 1000);
    // 返回函数相当于 rcc组件的 componentWillUnmount用来清楚定时器等参数
    return function () {
      // timer.clearInterval();
    };
  }, []);
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Banner></Banner>
      <List></List>
    </div>
  );
};
export default IndexPage;
