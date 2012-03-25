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
      var recipe = new SoundwichRecipe({
        name: 'Amsterdam Dagwood',
        creator: 'Michael',
        description: 'Plays a coversong',
        fillings: new FillingStack([
          {
            order: 1,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('soundwidge.askforartist'),
            parameter: {
              question: 'Which artist played your favorite live show?',
              defaultValue: 'Lady Gaga',
              subline: 'Played your favorite live show'
            }
          },
          {
            order: 2,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('echonest.familiarity'),
            parameter: {}
          },
          {
            order: 3,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similarartist'),
            parameter: {
              nArtist: 0,
            }
          },
          {
            order: 4,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('echonest.familiarity'),
            parameter: {}
          },
          {
            order: 5,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('echonest.terms'),
            parameter: {}
          },
          {
            order: 6,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.topalbums'),
            parameter: {
              nArtist: 3,
            }
          },
          /*
          {
            order: 6,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.topalbums'),
            parameter: {}
          },
          */
          /*
          {
            order: 7,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('musixmatch.tracks'),
            parameter: {}
          },
          
          {
            order: 7,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('musixmatch.lyrics'),
            parameter: {}
          }
          */
        ])
      });
      //this.soundwichViews.push(new SoundwichView(recipe));
      
      var recipe2 = new SoundwichRecipe({
        name: 'Big Club',
        creator: 'Michael',
        description: 'Plays a coversong',
        fillings: new FillingStack([
          {
            order: 1,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('soundwidge.askforartist'),
            parameter: {
              question: 'Which artist played your favorite live show?',
              defaultValue: 'Lady Gaga',
              subline: 'Played your favorite live show'
            }
          },
          {
            order: 2,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('echonest.terms'),
            parameter: {}
          },
          {
            order: 3,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('soundcloud.trackbytag'),
          },
        ])
      });
      
      this.soundwichViews.push(new SoundwichView(recipe2));
      
      
      var recipe3 = new SoundwichRecipe({
        name: 'Tagged Burger-Substitute',
        creator: 'Michael',
        description: '',
        fillings: new FillingStack([
          {
            order: 1,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('soundwidge.askforartist'),
            parameter: {
              question: 'Which artist die you discovered recently?',
              defaultValue: 'Goyte',
              subline: 'is what you discovered recently'
            }
          },
          {
            order: 2,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('drinkify.iframe'),
            parameter: {
              nArtist: 0,
            }
          },
          {
            order: 3,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similarartist'),
            parameter: {
              nArtist: 0,
            }
          },
          {
            order: 4,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('musicmetric.countries'),
            parameter: {
              nArtist: 0,
            }
          },
        ])
      });
      
      //this.soundwichViews.push(new SoundwichView(recipe3));
      
      var recipe3 = new SoundwichRecipe({
        name: 'Paddington Lyrics',
        creator: 'Michael',
        description: 'Plays a coversong',
        fillings: new FillingStack([
          {
            order: 5,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('soundwidge.askfortrackid'),
            parameter: {}
          },
          {
            order: 6,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('musixmatch.lyrics'),
            parameter: {}
          },
        ])
      });
      initial = {
        type: 'mbid.track',
        value: '028efe7f-cdfb-4135-846f-848f2fff15b1'
      };
      
      //this.soundwichViews.push(new SoundwichView(recipe2));
      
      
      this.render();
    },
    
    render: function() {
      
      this.template = Haml(template);
      this.el = this.$el = $(this.template({}));
      
      $('#app').replaceWith(this.$el);
      
      var $soundwiches = this.$el.find('.soundwiches');
      var n = 0;
      _.each(this.soundwichViews, function(soundwichView) {
        $soundwiches.append(soundwichView.render().$el);
        soundwichView.afterRender();
        n++;
      });
      $soundwiches.width(n * 600);
      return this;
    },
        
  });
  return new AppView;
});