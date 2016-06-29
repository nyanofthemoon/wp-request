import Request from 'request';

export default class Base {

  constructor(type, endpoint) {
    this.type     = type;
    this.endpoint = endpoint;
  }

  get(url, auth, oauth, headers, filter, data, callback) {
    var that  = this;
    Request.get(
      {
        url    : url + '/wp-json/wp/v2/' + that.endpoint + that._generateFilterString(filter),
        auth   : auth,
        oauth  : oauth,
        headers: headers,
        json   : true
      },
      function(err, response, body) {
        return callback(err, body);
      }
    );
  }

  post(url, auth, oauth, headers, filter, data, callback) {
    var that = this;
    Request.post(
      {
        url    : url + '/wp-json/wp/v2/' + that.endpoint + that._generateFilterString(filter),
        auth   : auth,
        oauth  : oauth,
        headers: headers,
        json   : true,
        form   : data
      },
      function(err, response, body) {
        return callback(err, body);
      }
    );
  }

  put(url, auth, oauth, headers, filter, data, callback) {
    var that = this;
    Request.put(
      {
        url    : url + '/wp-json/wp/v2/' + that.endpoint + that._generateFilterString(filter),
        auth   : auth,
        oauth  : oauth,
        headers: headers,
        json   : true,
        form   : data
      },
      function(err, response, body) {
        return callback(err, body);
      }
    );
  }

  delete(url, auth, oauth, headers, filter, data, callback) {
    var that = this;
    Request.delete(
      {
        url    : url + '/wp-json/wp/v2/' + that.endpoint + that._generateFilterString(filter),
        auth   : auth,
        oauth  : oauth,
        headers: headers,
        json   : true
      },
      function(err, response, body) {
        return callback(err, body);
      }
    );
  }

  _generateFilterString(filter) {
    if (filter) {
      switch(filter.type) {
        case 'id':
          return '/' + filter.value;
        case 'query':
          let filters = [];
          Object.keys(filter.value).forEach(function(key) {
            filters.push('filter[' + key + ']=' + filter.value[key]);
          });
          return '?' + filters.join('&');
        default:
      }
    }
    return '';
  }

}