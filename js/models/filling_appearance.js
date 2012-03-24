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
        domID: _.uniqueId('filling-'),
        filling: new Filling(),
        parameter: {
          test: true
        },
        prepared: false
      },
      
      prepare: function(data, context, cb) {
        var filling = this.get('filling');
        this.set({prepared: true});
        return filling.prepare(data, this.get('parameter'), context, cb);
      }
      
  });

  return FillingAppearance;
  
});