import axios from 'axios'

export const getCommitInfo = (api) => {
  return axios
  .get(api)
  .then(resp => resp.data)
  .then(resp => {
    return resp;
  })
  .catch(error => {
    console.error('请求出错，请重试')
  });
}

