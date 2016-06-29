import * as Models from './src/model'

class WPRequest {

  constructor(config) {
    this.url     = config.url;
    this.headers = null;
    this.auth    = null;
    this.oauth   = null;
    if (config.auth) {
      switch(config.auth.type) {
        case 'basic':
          this.auth = {
            user: config.auth.data.username,
            pass: config.auth.data.password
          };
          break;
        case 'bearer':
          this.auth = {
            bearer: config.auth.data.bearerToken
          };
          break;
        case 'oauth':
          this.oauth = {
            signature_method: this.auth.data.signature_method,
            consumer_key    : this.auth.data.consumer_key,
            token           : this.auth.data.oauth_token,
            token_secret    : this.auth.data.oauth_token_secret
          };
          if ('RSA-SHA1' === this.auth.data.signature_method) {
            this.oauth['private_key'] = this.auth.data.private_key;
          } else {
            this.oauth['consumer_secret'] = this.auth.data.consumer_secret;
          }
          break;
        default:
          break;
      }
    }
  }

  query(config, callback) {
    let method    = config.method.toLowerCase()    || 'get';
    let postType  = config.post_type.toLowerCase() || 'post';
    let modelName = postType.charAt(0).toUpperCase() + postType.slice(1);
    let data      = config.data                    || {};
    let filter    = config.filter                  || {};
    let model     = null;
    if (Models[modelName]) {
      model = new Models[modelName]();
    } else {
      model = new Models.CustomPost(modelName.toLowerCase());
    }
    model[method](this.url, this.auth, this.oauth, this.headers, filter, data, callback);
  }

}

export default WPRequest;