/*
 * @Author: heinan
 * @Date: 2021-07-22 15:37:17
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-22 16:11:44
 */
import { observable, action, runInAction, makeObservable } from 'mobx';
import { _getCityList } from '@/api/first';

class App {
  constructor() {
    makeObservable(this);
  }
  namespace = 'app';
  @observable cityList = [];

  @action.bound
  getCityList = async () => {
    const result = await _getCityList();
    runInAction(() => {
      this.cityList = result.citryList.city;
      console.log(this.cityList);
    });
  };
}
export default new App();
