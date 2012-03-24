define([
  'jquery'
  , 'models/parameter_type'
],
function (
  $
  , ParameterType
) {
  
  var ParameterTypes = Backbone.Collection.extend({
      model: ParameterType,
      
      getByKey: function(key) {
        var found = this.find(function(model){ return model.get('key') == key; });
        return found;
      },
  });
  
  return ParameterTypes;
  
});