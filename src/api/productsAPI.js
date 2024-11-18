import { $api } from './api';

const productsAPI = {
  getOneProduct: async (id) => {
    try {
      const { data } = await $api.get(`/api/products/${id}/`);
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  },
  getProductDataPromise: (arr) => {
    const getProductData = (element) => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await productsAPI.getOneProduct(element);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    };

    return Promise.all(arr.map((item) => getProductData(item)));
  },
};

export default productsAPI;
