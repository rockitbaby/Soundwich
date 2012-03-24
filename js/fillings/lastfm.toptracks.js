{
  name: 'top tracks',
  key: 'lastfm.toptracks',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Finds top tracks for an artist',
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
        'method': 'artist.gettoptracks',
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
        var track = res.toptracks.track[0];
        context.$el.show();
        context.$content.height(200);
        var h = track.name;
        h += ' is the top track by ' + res.toptracks.artist;
        context.$content.html(h);
        
        data['out'] = [
          {
            type: 'mbid.track',
            value: track.mbid
          },
          {
            type: 'track',
            value: track.name
          },
        ]
        
        cb(data);
      });
      
    }
  }
}


/* template */