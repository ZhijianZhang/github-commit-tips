import axios from 'axios'

export const getCommitInfo = (api,params) => {
  return axios
  .post(api, {data: params})
  .then(resp => resp.data)
  .then(resp => {
    return resp;
  })
  .catch(error => {
    console.error('请求出错，请重试')
  });
}

