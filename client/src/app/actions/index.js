import * as types from '../constants/ActionTypes';
import axios from 'axios';

import config from '../../../conf/config.json';

const apiUrl = config.apiUrl;
const owmUrl = config.owmUrl;
const urlServer = config.urlServer;

export function addTodo(text) {
  return {type: types.ADD_TODO, text};
}

export function deleteTodo(id) {
  return {type: types.DELETE_TODO, id};
}

export function editTodo(id, text) {
  return {type: types.EDIT_TODO, id, text};
}

export function completeTodo(id) {
  return {type: types.COMPLETE_TODO, id};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

export function fetchCurrentWeather(place) {
  return axios({
    url: `${owmUrl}weather?q=${place}${apiUrl}`,
    timeout: 20000,
    method: 'get',
    responseType: 'json'
  });
}

export function fetchForecastWeather(place) {
  return axios({
    url: `${owmUrl}forecast?q=${place}${apiUrl}`,
    timeout: 20000,
    method: 'get',
    responseType: 'json'
  });
}

export function fetchDevices() {
  return axios({
    url: `${urlServer}/api/devices`,
    timeout: 20000,
    method: 'get',
    responseType: 'json'
  });
}

export function toggleDevice(action, index) {
  return axios({
    url: `${urlServer}/api/devices/${index}/${action}`,
    timeout: 20000,
    method: 'get',
    responseType: 'json'
  });
}
