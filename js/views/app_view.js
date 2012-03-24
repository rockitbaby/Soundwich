define([
  'jquery'
  , 'views/soundwich_view'
  , 'require/text!templates/app.haml'
],
function (
  $
  , SoundwichView
  , template
) {
  var AppView = Backbone.View.extend({
  
    events: {

    },
    
    soundwichViews: [],
    initialize: function() {
      
      this.soundwichViews.push(new SoundwichView());
    },
    
    render: function() {
      
      this.template = Haml(template);
      this.el = this.$el = $(this.template({}));
      
      $('#app').replaceWith(this.$el);
      
      var $soundwiches = this.$el.find('.soundwiches');
      _.each(this.soundwichViews, function(soundwichView) {
        $soundwiches.append(soundwichView.render().$el);
        soundwichView.afterRender();
      });
      
      return this;
    },
        
  });
  return new AppView;
});