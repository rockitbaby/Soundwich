define([
  'jquery'
  ],
function(
  $
) {
  
  return {
    'lastfm': function() {
      return {
        mirror: function(x) {
          return x
        },
        query: function(req, cb) {
          var settings = {
            url: 'http://localhost:8888/proxy/lastfm.php',
            success: cb,
            data: req,
            type: 'GET'
          }
          $.ajax(settings);
        }
      }  
    },
    'musixmatch': function() {
      return {
        mirror: function(x) {
          return x
        },
        query: function(req, cb) {
          var settings = {
            url: 'http://localhost:8888/proxy/musixmatch.php',
            success: cb,
            data: req,
            type: 'GET'
          }
          $.ajax(settings);
        }
      }  
    },
    'echonest': function() {
      return {
        
        query: function(method, req, cb) {
          req['api_key'] = 'CQXLYWLZAWMTNOUAW';
          req['format'] = 'jsonp';
          var settings = {
            url: 'http://developer.echonest.com/api/v4/' + method,
            success: cb,
            data: req,
            type: 'GET',
            dataType: "jsonp"
          }
          $.ajax(settings);
        }
      }  
    },
  }
  
}
);