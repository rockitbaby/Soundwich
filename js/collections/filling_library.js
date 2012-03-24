define([
  'jquery'
  , 'collections/fillings'
  , 'collections/parameter_types'
  , 'collections/parameter_library'
  , 'lib/api_factory'
],
function (
  $
  , Fillings
  , ParameterTypes
  , ParameterLibrary
  , APIFactory
) {
  
  var FillingLibrary = new Fillings([
    {
      name: 'smoked coversongs',
      key: 'lastfm.coversongs',
      author: 'Michael Schieben <babre@rockitbaby.de>',
      description: 'Find Cover-Versions of Songs by a given Artist',
      API: APIFactory.get('lastfm'),
      accepts: new ParameterTypes([
        ParameterLibrary.getByKey('artist')
      ]),
      returns: new ParameterTypes([
        ParameterLibrary.getByKey('song')
      ]),
      exec: {
        prepare: function(data, context, cb) {
          console.log('preparing ' + this.get('name') + ' takes some time');
          window.setTimeout(function() {
            
            context.$el.show();
            context.$content.html('<div>Will now prepare you Sandwich. Talking to API:.</div>');
            var choices = ['Album 1', 'Album 2', 'Album 3'];
            
            var choicesCallback = function(choice) {
              console.log(' oh you choose ' + choice);
              
              context.$content.html(' oh you choose ' + choice);
              context.$el.show();
              data['return'] = choice;
              cb(data);
            }
            context.choose('Please choose', choices, choicesCallback);
            
          }, 1000);
          
        } 
      }
    },
    {
      name: 'salted songplayer',
      key: '7digital.songplayer',
      author: 'Michael Schieben <babre@rockitbaby.de>',
      description: 'Find a Song by its titles and plays it',
      API: APIFactory.get('7digital'),
      accepts: new ParameterTypes([
        ParameterLibrary.getByKey('song')
      ]),
      returns: new ParameterTypes([
        ParameterLibrary.getByKey('song')
      ]),
    }
  ]);
  
  
  FillingLibrary.loadFillingDefinition('js/fillings/lastfm.similarartists.js');
  FillingLibrary.loadFillingDefinition('js/fillings/lastfm.topalbums.js');
  FillingLibrary.loadFillingDefinition('js/fillings/lastfm.toptracks.js');
  FillingLibrary.loadFillingDefinition('js/fillings/echonest.familiarity.js');
  FillingLibrary.loadFillingDefinition('js/fillings/echonest.terms.js');
  //FillingLibrary.loadFillingDefinition('js/fillings/musixmatch.tracks.js');
  FillingLibrary.loadFillingDefinition('js/fillings/musixmatch.lyrics.js');
      
  return FillingLibrary;
  
});