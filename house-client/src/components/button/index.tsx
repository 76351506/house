/*
 * @Author: heinan
 * @Date: 2021-07-16 16:48:16
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-17 10:03:36
 */
import { FC } from 'react';
import './index.css';

const Button: FC<API.IButtonProps> = function ({ type, size, children }) {
  return <button className={`btn btn-${type} btn-${size}`}>{children}</button>;
};
export default Button;
