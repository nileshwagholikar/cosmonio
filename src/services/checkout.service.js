import BaseService from './base.service';

const basePath = '/api/commerce-service';

export default {
  getDeliveryModes(cartId, params = {}) {
    return BaseService.get(`${basePath}/cart/${cartId}/deliverymodes`, { params });
  },

  getPaymentMethods(params = {}) {
    return BaseService.get(`${basePath}/config`, { params });
  },
  updateDeliveryMode(cartId, deliveryMode) {
    return BaseService.post(`${basePath}/cart/${cartId}/deliverymodes`, {
      deliveryMode: deliveryMode
    });
  },

  updateDeliveryAddress(cartId, payload = {}, params = {}) {
    return BaseService.post(`${basePath}/cart/${cartId}/deliveryaddress`, payload, { params });
  },

  updateEmail(cartId, payload = {}, params = {}) {
    return BaseService.post(`${basePath}/cart/${cartId}/email`, payload, { params });
  }
};
