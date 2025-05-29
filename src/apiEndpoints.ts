const baseUrl = 'http://localhost:8000';
export const apiEndpoints = {
  auth: {
    login: `${baseUrl}/auth/login`,
    register: `${baseUrl}/auth/register`,
  },
  model: {
    getListByUser: `${baseUrl}/model`,
    getById: `${baseUrl}/model/`,
    create: `${baseUrl}/model`,
    update: `${baseUrl}/model/`,
    delete: `${baseUrl}/model/`,
  },
};
