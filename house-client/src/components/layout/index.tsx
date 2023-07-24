/*
 * @Author: heinan
 * @Date: 2021-07-16 16:40:21
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-22 16:37:44
 */

import { FC } from 'react';
import Header from './header';
import Footer from './footer';
import Content from './content';
import { Provider } from 'mobx-react';
import Store from '@/store';

import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import '@/assets/css/style.css';

const Layout: FC = function ({ children }) {
  return (
    <div className="wraper">
      <Provider {...Store}>
        <Header></Header>
        <Content>{children}</Content>
        <Footer></Footer>
      </Provider>
    </div>
  );
};
export default Layout;
