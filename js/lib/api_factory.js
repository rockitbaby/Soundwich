define([
  'jquery'
  , 'apis/collection'
  ],
function(
  $
  , APIs
) {

  var sharedInstances = {};
  var APIFactory = function(options) {
    this.initialize.apply(this, arguments);
    
    this.get = function(name) {
      
      if(_.has(sharedInstances, name)) {
        return sharedInstances[name];
      }
      
      return this.createInstance(name);
      
    };
    
    this.createInstance = function(name) {
      
      if(!_.has(APIs, name)) {
        sharedInstances[name] = null;
      } else {
        sharedInstances[name] = new APIs[name]();
      }
      return sharedInstances[name];
    };
    
  };
  
  _.extend(APIFactory.prototype, {
    
    options: {
    },
    
    initialize: function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      this.options = options;
    },

  });
  
  return new APIFactory();
  
}
);