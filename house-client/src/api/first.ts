/*
 * @Author: heinan
 * @Date: 2021-07-22 15:44:59
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-22 15:46:42
 */
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function _getCityList() {
  const url = '/api/getCityList';
  return request(url);
}
