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
      
      var t = this.template();
      this.API().query(req, function(res) {
        
        var album = res.topalbums.album[parameter.nAlbum];
        context.$el.show();
        context.$content.css('height', 'auto');
        
        var h = t({
          artist_name: album.artist.name,
          album_name: album.name,
          img_src: album.image[2]['#text']
        });
        
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

<div class="box lastfm lastfm-topalbums">
  <h2 class="title">Top Album</h2>
  <div class="scoop">
    <h3><%= album_name %></h3>
    <p>is <%= artist_name %>'s top album</p>
  </div>
  <div class="img">
    <img src="<%= img_src %>" />
  </div>
  <div class="credits">
    says last.fm
  </div>
</div>