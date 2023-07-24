/*
 * @Author: heinan 
 * @Date: 2021-07-17 11:34:29 
 * @Last Modified by:   heinan 
 * @Last Modified time: 2021-07-17 11:34:29 
 */
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

var mock = new MockAdapter(axios);

mock.onGet('/users').reply(200, {
  users: [{ id: 1, name: 'John Smith' }],
});
