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
      exec: {
        prepare: function(data, context, cb) {
          // context.$el
          // context.choose(text, choices, callback)
          context.$el.show();
          console.log('preparing ' + this.get('name'));
          cb(data);
        } 
      }
    },
    
    prepare: function(data, context, cb) {
      var exec = this.get('exec');
      if(!_.isFunction(exec.prepare)) {
        cb(data)
        return true;
      }
      return exec.prepare.apply(this, [data, context, cb]);
    }
    
  });

  return Filling;
  
});