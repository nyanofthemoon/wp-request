# WP Request
Javascript library for querying the WordPress REST API v2.

### Examples
```javascript
var wordpress = new WPRequest({
  url : 'http://localhost'
});

wordpress.query({
  method   : 'GET',
  post_type: 'post'
}, function(error, response) {
  ...
});

wordpress.query({
  method   : 'GET',
  post_type: 'post',
  filter   : {
    type : 'id',
    value: 100
  }
}, function(error, response) {
  ...
});
```