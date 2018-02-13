import axios from 'axios';

const mockData = {
  "temperature": {
    "current": 72,
    "target": 72 
  },
  "lights": [
    {"room": "Patio", "switched": "on", "hours": 20},
    {"room": "Living Room", "switched": "off", "hours": 32},
    {"room": "Kitchen", "switched": "on", "hours": 112}
  ]
}

export const getData = () => {
  return axios.get('./data.json').then( res => mockData )
}