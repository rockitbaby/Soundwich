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
  
  var FillingLibrary = new Fillings();
  
  
  FillingLibrary.loadFillingDefinition('js/fillings/lastfm.similarartists.js');
  FillingLibrary.loadFillingDefinition('js/fillings/lastfm.topalbums.js');
  FillingLibrary.loadFillingDefinition('js/fillings/lastfm.toptracks.js');
  FillingLibrary.loadFillingDefinition('js/fillings/echonest.familiarity.js');
  FillingLibrary.loadFillingDefinition('js/fillings/echonest.terms.js');
  //FillingLibrary.loadFillingDefinition('js/fillings/musixmatch.tracks.js');
  FillingLibrary.loadFillingDefinition('js/fillings/musixmatch.lyrics.js');
  FillingLibrary.loadFillingDefinition('js/fillings/soundwidge.askforartist.js');
  FillingLibrary.loadFillingDefinition('js/fillings/soundwidge.askfortrackid.js');
  FillingLibrary.loadFillingDefinition('js/fillings/musicmetric.countries.js');
  FillingLibrary.loadFillingDefinition('js/fillings/drinkify.iframe.js');
  FillingLibrary.loadFillingDefinition('js/fillings/soundcloud.trackbytag.js');
              
  return FillingLibrary;
  
});