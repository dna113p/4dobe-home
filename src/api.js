import axios from 'axios';

export const getData = () => {
  return axios.get('./data.json').then( res => res.data )
}