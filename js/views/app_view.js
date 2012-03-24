define([
  'jquery'
  , 'views/soundwich_view'
  , 'collections/filling_library'
  , 'collections/filling_stack'
  , 'models/soundwich_recipe'
  , 'require/text!templates/app.haml'  + '?'  + (new Date).getTime()
],
function (
  $
  , SoundwichView
  , FillingLibrary
  , FillingStack
  , SoundwichRecipe
  , template
) {
  var AppView = Backbone.View.extend({
  
    events: {

    },
    
    soundwichViews: [],
    initialize: function() {
      
      var recipe = new SoundwichRecipe({
        name: 'Small Coversong Club',
        creator: 'Michael',
        description: 'Plays a coversong',
        fillings: new FillingStack([
          {
            filling: FillingLibrary.getByKey('lastfm.coversongs'),
            parameters: {}
          },
          {
            filling: FillingLibrary.getByKey('7digital.songplayer'),
            parameters: {}
          }
        ])
      });
      this.soundwichViews.push(new SoundwichView(recipe));
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