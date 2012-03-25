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
    'musicmetric': function() {
      return {
        
        query: function(method, req, cb) {
          req['token'] = '1018c0f586f84b37ba03268d6d736cd4';
          req['format'] = 'jsonp';
          var settings = {
            url: 'http://api.semetric.com/' + method,
            success: cb,
            data: req,
            type: 'GET',
            dataType: "jsonp"
          }
          $.ajax(settings);
        }
      }  
    },
    'soundcloud': function() {
      return {
        
        query: function(method, req, cb) {
          req['client_id'] = 'M6fFMCpbKJq2WSWcl8xkkg';
          req['format'] = 'jsonp';
          var settings = {
            url: 'http://api.soundcloud.com/' + method,
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