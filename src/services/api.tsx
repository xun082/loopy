const api = {
  getCaptcha: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/auth/send',
};
console.log(api);
export default api;
