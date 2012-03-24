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