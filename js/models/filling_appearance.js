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
        parameters: {},
        prepared: false
      },
      
      prepare: function(data, context, cb) {
        var filling = this.get('filling');
        this.set({prepared: true});
        data['properties'] = this.get('parameters');
        return filling.prepare(data, context, cb);
      }
      
  });

  return FillingAppearance;
  
});