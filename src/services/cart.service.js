import BaseService from "./base.service";

const basePath = "/api/commerce-service";

export default {
  getCartDetails(cartId, params) {
    return BaseService.get(`${basePath}/cart/${cartId}`, {
      params: params || {}
    });
  },

  addCartItem(cartId, itemId) {
    return BaseService.post(
      `${basePath}/cart/${cartId}`,
      {},
      {
        params: { productId: itemId }
      }
    );
  },

  updateCartItem(cartId, itemId, quantity) {
    return BaseService.put(
      `${basePath}/cart/${cartId}/${itemId}`,
      {},
      {
        params: { quantity: quantity }
      }
    );
  },

  updateVoucherCode(voucherCode, cartId, action) {
    if (action === "remove") {
      return BaseService.delete(
        `${basePath}/cart/${cartId}/vouchers/${voucherCode}`
      );
    }
    return BaseService.post(`${basePath}/cart/${cartId}/vouchers`, {
      voucherId: voucherCode
    });
  },

  getProductDetails({ ctn, sectorId, localeId, catalogId }, params) {
    return BaseService.get(
      `/prx/product/${sectorId}/${localeId}/${catalogId}/products/${ctn}.summary`,
      {
        params: params || {}
      }
    );
  }
};
