define([
  "require/order!support/underscore"
  , "require/order!support/underscore.string"
  ],
function(
  _underscore // loaded in index.html
  , _underscoreString
) {
  _.mixin(_.string.exports());
  return _;
});
