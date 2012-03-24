{
  name: 'similar taste',
  key: 'lastfm.similarartist',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Finds similar artists',
  API: APIFactory.get('lastfm'),
  accepts: ['artist'],
  returns: ['artist'],
  parameter: {
    nArtist: 0
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
        'method': 'artist.getsimilar',
        'format': 'json',
        'autocorrect': 1
      }
      
      var v = this.input(data, 'mbid.artist');
      if(v) {
        console
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
        var artist = res.similarartists.artist[parameter.nArtist];
        context.$el.show();
        context.$content.height(200);
        var h = '<img src="' + artist.image[2]['#text'] + '">';
        h += artist.name;
        h += ' is similar to ' + res.similarartists['@attr'].artist;
        context.$content.html(h);
        
        data['out'] = [
          {
            type: 'mbid.artist',
            value: artist.mbid
          },
          {
            type: 'artist',
            value: artist.name
          },
        ]
        
        cb(data);
      });
      
    }
  }
}


/* template */