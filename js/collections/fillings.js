define([
  'jquery'
  , 'models/filling'
  , 'collections/parameter_types'
  , 'collections/parameter_library'
  , 'lib/api_factory'
],
function (
  $
  , Filling
  , ParameterTypes
  , ParameterLibrary
  , APIFactory
) {
  
  var Fillings = Backbone.Collection.extend({
      model: Filling,
      
      getByKey: function(key) {
        var found = this.find(function(model){ return model.get('key') == key; });
        
        /*
        if(_.isUndefined(found)) {
          console.log(typeof found);
          console.error('Key ' + key + ' not found in Fillings');
        }
        */
        return found;
      },
      
      loaded: 0,
      onLoadedCallback: null,
      onLoaded: function(cb) {
        this.onLoadedCallback = cb;
        if(this.loaded == 0) {
          this.triggerLoaded();
        }
      },
      
      triggerLoaded: function() {
        
        if(!this.loaded == 0) {
          return;
        }
        if(_.isFunction(this.onLoadedCallback)) {
          this.onLoadedCallback.apply(this);
        }
      },
      
      loadFillingDefinition: function(file, cb) {
        this.loaded++;
        require(['require/text!' + file + '?v=' + Math.random()], _.bind(function(fillingDef) {

          var parts = fillingDef.split('/* template */');

          var obj = eval('(' + parts[0] + ')');

          try {
            var obj = eval('(' + parts[0] + ')');
          } catch(e) {
            console.error("Parse Error parsing " + file);
            return;
          }

          var filling = obj;
          var accepts = filling.accepts;
          filling.accepts = new ParameterTypes();
          _.each(accepts, function(parameterKey) {
            var parameterType = ParameterLibrary.getByKey(parameterKey);
            if(parameterType) {
              filling.accepts.add(ParameterLibrary.getByKey(parameterKey))
            } else {
              console.error("Unsupported parameter key" + parameterKey);
            }
          });
          var returns = filling.returns;
          filling.returns = new ParameterTypes();
          _.each(returns, function(parameterKey) {
            var parameterType = ParameterLibrary.getByKey(parameterKey);
            if(parameterType) {
              filling.returns.add(ParameterLibrary.getByKey(parameterKey))
            } else {
              console.error("Unsupported parameter key" + parameterKey);
            }
          });
          filling.templateText = parts[1];
          filling.definitionFile = file;
          
          
          var existing = this.getByKey(filling.key);
          if(existing) {
            console.log('Filling or key ' + filling.key + ' allready exits. Updating!');
            existing.set(filling);
            if(_.isFunction(cb)) {
              cb.apply(this, existing);
            }
          } else {
            this.add([filling]);
          }
          this.loaded--;
          this.triggerLoaded();
        }, this));

      }
  });
  
  return Fillings;
  
});