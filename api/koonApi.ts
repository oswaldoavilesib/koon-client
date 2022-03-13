import axios from 'axios';

const koonApi = axios.create({
    baseURL: '/api'
})


export default koonApi;