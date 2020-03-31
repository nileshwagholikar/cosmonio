const defaultConfig = {
    expires: '',
    path: '; path=/',
    domain: '',
    secure: ''
  },
  getCookieExpiry = (expireTimes) => {
    let _expires = '';
    expireTimes = expireTimes === undefined ? defaultConfig.expires : expireTimes;
    if (expireTimes && expireTimes !== 0) {
      switch (expireTimes.constructor) {
        case Number:
          _expires =
            expireTimes === Infinity || expireTimes === -1
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : `; max-age=${expireTimes}`;
          break;
        case String:
          if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
            // get capture number group
            const _expireTime = expireTimes.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, '$1'),
              // get capture type group , to lower case
              typeGroup = { m: 2592000, d: 86400, h: 3600, min: 60, s: 1, y: 31104000 },
              type = expireTimes.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, '$1').toLowerCase();
            if (type) {
              _expires = `; max-age=${Number(_expireTime) * typeGroup[type]}`;
            } else {
              new Error('unknown exception of set operation');
            }
          } else {
            _expires = `; expires=${expireTimes}`;
          }
          break;
        case Date:
          _expires = `; expires=${expireTimes.toUTCString()}`;
          break;
        default:
          break;
      }
    }
    return _expires;
  };

export default {
  /**
   * This method will return the cookie value based on the key passed. The regex splits  the key
   * and takes the string cookie name and gets the cookie value
   *
   * @param {string} key
   * @returns string
   * @public
   */
  getCookie(key) {
    let value =
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            `(?:(?:^|.*;)\\s*${encodeURIComponent(key).replace(
              /[-.+*]/g,
              '\\$&'
            )}\\s*\\=\\s*([^;]*).*$)|^.*$`
          ),
          '$1'
        )
      ) || null;

    if (
      value &&
      value.substring(0, 1) === '{' &&
      value.substring(value.length - 1, value.length) === '}'
    ) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  },
  setCookie({ key, value, expireTimes, path, domain, secure }) {
    if (!key) {
      throw new Error('cookie name is not find in first argument');
    } else if (/^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
      throw new Error('cookie key name illegality');
    }
    // support json object
    if (value && value.constructor === Object) {
      value = JSON.stringify(value);
    }
    const _expires = getCookieExpiry(expireTimes);
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${_expires}${
      domain ? `; domain=${domain}` : defaultConfig.domain
    }${path ? `; path=${path}` : defaultConfig.path}${
      secure === undefined ? defaultConfig.secure : secure ? '; secure' : ''
    }`;
    return this;
  }
};
