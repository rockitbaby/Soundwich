define([
  'jquery'
],
function (
  $
) {
    
  var ParameterType = Backbone.Model.extend({
      defaults : {
          name: 'undefined',
          defaultValue: 0
      }
  });

  return ParameterType;
  
});