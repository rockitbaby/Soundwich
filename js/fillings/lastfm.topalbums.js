{
  name: 'top albums',
  key: 'lastfm.topalbums',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Finds top albums for an artist',
  API: APIFactory.get('lastfm'),
  accepts: ['artist'],
  returns: ['artist', 'album'],
  parameter: {
    nAlbum: 0
  },
  exec: {
    prepare: function(data, parameter, context, cb) {
      
      console.log('========= ========= ========= ========= ');
      console.log('preparing ' + this.get('name'));
      console.log('DATA');
      console.log(data);
      console.log('PARAMETER');
      console.log(parameter);
      console.log('CONTEXT');
      console.log(context);
      
      var req = {
        'method': 'artist.gettopalbums',
        'format': 'json',
        'autocorrect': 1
      }
      
      var v = this.input(data, 'mbid.artist');
      if(v) {
        req.mbid = v.value;
      } else {
        v = this.input(data, 'artist');
        if(v) {
          req.artist = v.value;
        } else {
          context.unsupportedInput();
          cb(data);
          return;
        }
      }
      
      this.API().query(req, function(res) {
        
        console.log(res);
        var album = res.topalbums.album[parameter.nAlbum];
        context.$el.show();
        context.$content.height(200);
        var h = '<img src="' + album.image[2]['#text'] + '">';
        h += album.name;
        h += ' is the top album by ' + album.artist.name;
        context.$content.html(h);
        
        data['out'] = [
          {
            type: 'mbid.artist',
            value: album.artist.mbid
          },
          {
            type: 'artist',
            value: album.artist.name
          },
          {
            type: 'mbid.album',
            value: album.mbid
          },
          {
            type: 'album',
            value: album.name
          },
        ]
        
        cb(data);
      });
      
    }
  }
}


/* template */