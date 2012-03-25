define([
  'jquery'
  , 'models/soundwich_recipe'
  , 'collections/filling_library'
  , 'collections/filling_stack'
  , 'lib/api_factory'
],
function (
  $
  , SoundwichRecipe
  , FillingLibrary
  , FillingStack
  , APIFactory
) {

  
  var SoundwichRecipes = Backbone.Collection.extend({
      model: SoundwichRecipe,
      
      getByKey: function(key) {
        var found = this.find(function(model){ return model.get('key') == key; });
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
      
      soundwichLoaded: function(data, cb) {
        
        var fillings = [];
        _.each(data.fillings, function(filling) {
          
          var appearance = filling;
          appearance.filling = FillingLibrary.getByKey(filling.filling);
          fillings.push(appearance);
        });
        
        data.fillings = new FillingStack(fillings);
        
        var soundwich = new SoundwichRecipe(data);
        this.add(soundwich);
        cb.apply(this, [soundwich]);
      },
      
      loadSoundwich: function(id, cb, cbError) {
        this.loaded++;
        var req = {
          id: id
        };
        var settings = {
          url: window.BASE_URL + '/api/soundwiches.php',
          success: _.bind(function(data) {
            this.soundwichLoaded(data, cb)
          }, this),
          error: function(data) {
            cbError.apply(this, [data, id])
          },
          data: req,
          format: 'json',
          type: 'GET',
        }
        
        $.ajax(settings);
        return;
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
  
  return SoundwichRecipes;
  
});