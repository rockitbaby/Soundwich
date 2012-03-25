define([
  'jquery'
  , 'views/soundwich_view'
  , 'collections/filling_library'
  , 'collections/filling_stack'
  , 'collections/soundwich_recipes'
  , 'models/soundwich_recipe'
  , 'require/text!templates/app.haml'  + '?'  + (new Date).getTime()
],
function (
  $
  , SoundwichView
  , FillingLibrary
  , FillingStack
  , SoundwichRecipes
  , SoundwichRecipe
  , template
) {
  var AppView = Backbone.View.extend({
  
    events: {

    },
    
    soundwichViews: [],
    booting: true,
    initialize: function() {
      FillingLibrary.onLoaded(_.bind(this.bootingFinished, this));
    },
    
    soundwichToLoad: null,
    loadSoundwich: function(id) {
      
      if(this.boting) {
        this.soundwichToLoad = id;
      } else {
        $('#app').html('').append('<div class="modal loading"><div class="content">Loading Soundwich ' + id + '</div></div>');
        var SoundwichLibrary = new SoundwichRecipes();
        SoundwichLibrary.loadSoundwich(id, _.bind(this.soundwichLoaded, this), _.bind(this.soundwichLoadError, this));
      }
      
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
    loaded: false,
    soundwichLoaded: function(soundwich) {
      
      this.loaded = true;
      
      this.soundwichViews.push(new SoundwichView(soundwich));
      
      this.render();
    },
    
    fake: function() {
      
      
      var recipe = new SoundwichRecipe({
        name: 'Similar elsewhere',
        key: 'Monte Christo',
        creator: 'Michael',
        description: 'Plays a coversong',
        fillings: new FillingStack([
          {
            order: 1,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('soundwidge.askforartist'),
            parameter: {
              question: 'Which artist made the first record you bought?',
              defaultValue: 'Beastie Boys',
              subline: 'made the first record you bought'
            }
          },
          {
            order: 2,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similarartists'),
            parameter: {
              nArtist: 0,
            }
          },
          {
            order: 3,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('musicmetric.countries'),
            parameter: {
              nArtist: 0,
            }
          },
          {
            order: 4,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similarartists'),
            parameter: {
              nArtist: 1,
            }
          },
          {
            order: 4,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similarartists'),
            parameter: {
              nArtist: 2,
            }
          },
          {
            order: 5,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('musicmetric.countries'),
            parameter: {
              nArtist: 0,
            }
          },
        ])
      });
      
      var fs = [];
      recipe.get('fillings').each(function(filling) {
        var fj = filling.toJSON();
        console.log(fj.filling);
        fj.filling = fj.filling.get('key');
        fs.push(fj);
      });
      
      var data = recipe.toJSON();
      data.fillings = fs;
      
      console.log("SOUNDWICH DATA");
      console.log(JSON.stringify(data));
      
      this.soundwichViews.push(new SoundwichView(recipe));
      
    },
    
    soundwichLoadError: function(data, id) {
      $('#app').html('').append('<div class="modal error"><div class="content">Could not load Soundwich ' + id + '<br />Try <a href="#eat/amsterdam">Amsterdam</a></div></div>');
      
    },
    
    bootingFinished: function() {
      this.booting = false;
      if(this.soundwichToLoad) {
       this.loadSoundwich(this.soundwichToLoad);
       this.soundwichToLoad = null;
      }
    },
    
    createSoundwich: function() {
      
      var SoundwichLibrary = new SoundwichRecipes();
      SoundwichLibrary.loadSoundwich('amsterdam', _.bind(this.soundwichLoaded, this));
      
      
      /*
      SoundwichLibrary.loadSoundwich('amsterdam', _.bind(function(soundwich) {
        console.log("SOUNDWICH FROM SERVER");
        console.log(soundwich);
        console.log(this);
        this.soundwichViews.push(soundwich);
        this.render();
      }, this));
      */
      return;
      
      var recipe = new SoundwichRecipe({
        name: 'Paddington Lyrics',
        creator: 'Michael',
        description: 'Plays a coversong',
        fillings: new FillingStack([
          {
            order: 1,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('soundwidge.askforartist'),
            parameter: {
              question: 'Which artist made the first record you bought?',
              defaultValue: 'Beastie Boys',
              subline: 'made the first record you bought'
            }
          },
          {
            order: 2,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similiarartists'),
            parameter: {
              nArtist: 0,
            }
          },
          {
            order: 3,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('musicmetric.countries'),
            parameter: {
              nArtist: 0,
            }
          },
          {
            order: 4,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('lastfm.similiarartists'),
            parameter: {
              nArtist: 2,
            }
          },
          {
            order: 5,
            domID: _.uniqueId('filling-'),
            filling: FillingLibrary.getByKey('musicmetric.countries'),
            parameter: {
              nArtist: 0,
            }
          },
        ])
      });
      
      var fs = [];
      recipe.get('fillings').each(function(filling) {
        var fj = filling.toJSON();
        fj.filling = fj.filling.get('key');
        fs.push(fj);
      });
      
      var data = recipe.toJSON();
      data.fillings = fs;
      
      console.log("SOUNDWICH DATA");
      console.log(JSON.stringify(data));
      //this.soundwichViews.push(new SoundwichView(recipe));
      
      var recipe2 = new SoundwichRecipe({
        name: 'Salted Lyrics Club Sandwich',
        key: 'lyrics',
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
      
      
      
    },
        
  });
  return new AppView;
});