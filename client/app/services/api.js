/* eslint-disable */

import { getJSON, post } from '../utils/ajax'

const endpoint = '/api';

let users = {

  getAll: function (callback) {
    getJSON(endpoint + '/users/', function (json) {
      callback(null, json);
    }, function (status) {
      callback(status, null);
    })
  }
};

let companies = {

  getAll: function (callback) {
    getJSON(endpoint + '/companies/', function (json) {
      callback(null, json);
    }, function (status) {
      callback(status, null);
    })
  },

  verify: function (id, callback) {
    post(endpoint + '/companies/' + id + '/verify', function (json) {
      callback(null, json);
    }, function (status) {
      callback(status, null);
    })
  }
};

let stores = {

  getAll: function (callback) {
    getJSON(endpoint + '/stores/', function (data) {
      callback(null, data);
    }, function (status) {
      callback(status, null);
    });
  },

  getStoreWindowProducts: function (storeId, callback) {
    getJSON(endpoint + '/stores/' + storeId + '/products/window', function (json) {
      callback(null, json)
    }, function (status) {
      callback(status, null);
    });
  }
};

let products = {

  getAll: function (callback) {
    getJSON(endpoint + '/products/', function (json) {
      callback(null, json);
    }, function (status) {
      callback(status, null);
    })
  },

  verify: function (id, callback) {
    post(endpoint + '/products/' + id + '/verify', function (json) {
      callback(null, json);
    }, function (status) {
      callback(status, null);
    })
  }
};

export {
  users,
  companies,
  stores,
  products
};
