import axios from 'axios'

const BASE_URL = 'https://api.stackexchange.com/'

const ApiEndpoints = {
  getQuestions: (ids: string) => `users/${ids}/questions?order=desc&sort=activity&site=stackoverflow`,
}

const Api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const gePostQuestions = async (ids: string) => {
  return await Api.get(ApiEndpoints.getQuestions(ids))
}

const api = {
  gePostQuestions
}


export default api