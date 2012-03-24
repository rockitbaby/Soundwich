define([
  'jquery'
  , 'models/filling'
],
function (
  $
  , Filling
) {
    
  var FillingAppearance = Backbone.Model.extend({
      defaults: {
        filling: new Filling(),
        parameters: {}
      }
  });

  return FillingAppearance;
  
});