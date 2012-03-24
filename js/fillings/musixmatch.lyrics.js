{
  name: 'lyrix',
  key: 'musixmatch.lyrics',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Finds lyrics for an album',
  API: APIFactory.get('musixmatch'),
  accepts: ['mbid.track'],
  returns: ['mbid.track', 'mbid.artist'],
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
        'method': 'track.lyrics.get'
      }
      
      var v = this.input(data, 'mbid.track');
      if(v) {
        req.track_mbid = v.value;
      } else {
        context.unsupportedInput();
        cb(data);
        return;
      }
      
      var tmplText = this.get('templateText');
      this.API().query(req, function(res) {
        
        console.log(res);
        var lyrics = res.message.body.lyrics.lyrics_body;

        context.$el.show();
        context.$el.append(tmplText);
        context.$content.css('height', 'auto');
        var h = '<div class="lyrics">';
        h += lyrics.replace(/\n/g, '<br />');
        h += '</div>';
        context.$content.html(h);
        
        data['out'] = data['in'];
        
        cb(data);
      });
      
    }
  }
}


/* template */
<style type="text/css">
  .lyrics {
    text-align: center;
    padding: 20px;
  }
</style>