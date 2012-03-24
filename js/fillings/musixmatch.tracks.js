{
  name: 'tracks',
  key: 'musixmatch.tracks',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Finds tracks for an album',
  API: APIFactory.get('musixmatch'),
  accepts: ['mbid.album'],
  returns: ['mbid.album', 'mbid.artist', 'mbid.track'],
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
        'method': 'album.tracks.get'
      }
      
      var v = this.input(data, 'mbid.album');
      if(v) {
        req.album_mbid = v.value;
      } else {
        context.unsupportedInput();
        cb(data);
        return;
      }
      
      this.API().query(req, function(res) {
        
        console.log(res);
        
        /*
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
        */
        
        cb(data);
      });
      
    }
  }
}


/* template */