import BaseService from './base.service';

const basePath = '/api/web-session';

export default {
  getAccessToken(payload = {}, params = {}) {
    return BaseService.post(`${basePath}/token`, payload, { params });
  }
};
