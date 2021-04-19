import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://tirapta-ecomerce.herokuapp.com'

})

export default instance
