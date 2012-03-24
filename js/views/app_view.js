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
      
      FillingLibrary.onLoaded(_.bind(this.createSoundwich, this));
      
    },
    
    createSoundwich: function() {
      console.log("CREATE SOUNDWICH");
      var recipe = new SoundwichRecipe({
        name: 'Small Coversong Club',
        creator: 'Michael',
        description: 'Plays a coversong',
        fillings: new FillingStack([
          /*
          {
            order: 1,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.coversongs'),
            parameters: {}
          },
          */
          {
            order: 2,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similarartist'),
            parameter: {
              nArtist: 0,
            }
          },
          {
            order: 3,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similarartist'),
            parameter: {
              nArtist: 3,
            }
          },
          {
            order: 1,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('echonest.familiarity'),
            parameter: {}
          }
        ])
      });
      this.soundwichViews.push(new SoundwichView(recipe));
      
      this.render();
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