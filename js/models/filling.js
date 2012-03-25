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
      templateText: '',
      definitionFile: null,
      parameter: {
        
      },
      exec: {
        prepare: function(data, parameter, context, cb) {
          context.$el.show();
          console.log('preparing ' + this.get('name'));
          cb(data);
        } 
      }
    },
    
    
    API: function() {
      return this.get('API');
    },
    
    template: function() {
      return _.template(this.get('templateText'));
    },
    
    input: function(data, type) {

      var found = _.filter(data['in'], function(d) { console.log(d); return (d.type == type)});
      
      if(_.isUndefined(found)) {
        return null;
      }
      if(!found.length) {
        return null;
      }
      return found[0];
    },
    
    prepare: function(data, parameter, context, cb) {
      var exec = this.get('exec');
      if(!_.isFunction(exec.prepare)) {
        cb(data)
        return true;
      }
      var parameter = _.extend(this.get('parameter'), parameter);
      return exec.prepare.apply(this, [data, parameter, context, cb]);
    }
    
  });

  return Filling;
  
});