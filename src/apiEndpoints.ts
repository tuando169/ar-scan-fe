const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://ar-scan-be.vercel.app'
    : 'http://localhost:8000';

export const apiEndpoints = {
  auth: {
    login: `${baseUrl}/auth/login`,
    register: `${baseUrl}/auth/register`,
    changePassword: `${baseUrl}/auth/change-password`,
  },
  model: {
    getListByUser: `${baseUrl}/model`,
    getById: `${baseUrl}/model/`,
    create: `${baseUrl}/model`,
    update: `${baseUrl}/model/`,
    delete: `${baseUrl}/model/`,
  },
};
