define([
  'jquery'
  , 'collections/parameter_types'
  , 'collections/parameter_library'
],
function (
  $
  , ParameterTypes
  , ParameterLibrary
) {
    
  var Filling = Backbone.Model.extend({
    defaults: {
      name: 'untitled',
      key: 'key',
      author: 'unknown',
      description: '',
      API: null,
      accepts: new ParameterTypes(),
      returns: new ParameterTypes(),
      exec: {}
    }
  });

  return Filling;
  
});