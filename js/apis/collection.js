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
        }
      }  
    },
    '7digital': function() {
      return {
        mirror: function(x) {
          return x
        }
      }  
    },
  }
  
}
);