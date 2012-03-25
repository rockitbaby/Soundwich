define([
  'require/order!jquery'
  , 'support/haml'
  , 'require/order!support/iscroll'
  , 'require/order!support/underscore.enriched'
  , 'require/order!support/backbone'
  , 'require/order!support/jquery.transit'
  , 'require/order!support/jquery.color'
  , 'require/order!app'
  ],
function(
  _jQuery
  , _Haml
  , _iScroll
  , _underscore
  , _backbone
  , _jqueryTransit
  , _jqueryColor
  , App
) {
  
  //var BASE_URL = 'http://rockitbaby.de/projects/soundwich/app';
  var BASE_URL = 'http://localhost:8888';
  window.BASE_URL = ''
  App.initialize(); 
});
