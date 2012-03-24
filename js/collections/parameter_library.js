define([
  'jquery'
  , 'collections/parameter_types'
],
function (
  $
  , ParameterTypes
) {
  
  var ParameterLibrary = new ParameterTypes([
    {
      key: 'artist',
      defaultValue: 'The Beatles'
    },
    {
      key: 'echonest.artist',
      defaultValue: ''
    },
    {
      key: 'mbid.artist',
      defaultValue: ''
    },
    {
      key: 'album',
      defaultValue: 'untitled'
    },
    {
      key: 'song',
      defaultValue: 'untitled'
    }
  ]);
  
  return ParameterLibrary;
  
});