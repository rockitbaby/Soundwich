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
  
  return FillingLibrary;
  
});