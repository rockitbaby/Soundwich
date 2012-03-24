define([
  'jquery'
  , 'models/filling'
],
function (
  $
  , Filling
) {
  
  var Fillings = Backbone.Collection.extend({
      model: Filling,
      
      getByKey: function(key) {
        var found = this.find(function(model){ return model.get('key') == key; });
        return found;
      },
  });
  
  return Fillings;
  
});