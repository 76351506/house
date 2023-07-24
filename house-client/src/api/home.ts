/*
 * @Author: heinan 
 * @Date: 2021-07-22 15:46:06 
 * @Last Modified by:   heinan 
 * @Last Modified time: 2021-07-22 15:46:06 
 */

// @ts-ignore
/* eslint-disable */
import axios from 'axios';
import { request } from 'umi';
import { resolve } from '@/utils';

export function _getBannerList() {
  const url = resolve('/banners/bannerList');
  return request(url);
}

export function _getMealInfoList() {
  const url = resolve('/product/setMealInfoList');
  return request(url);
}

export function _getUsreList() {
  const url = '/users';
  return axios.get(url);
}
