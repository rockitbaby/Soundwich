{
  name: 'test for musicmetric',
  key: 'musicmetric.countries',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Test musicmetric',
  API: APIFactory.get('musicmetric'),
  accepts: ['mbid.artist'],
  returns: ['artist', 'mbid.artist'],
  parameter: {
    nArtist: 0
  },
  exec: {
    prepare: function(data, parameter, context, cb) {
      
      console.log('========= ========= ========= ========= ');
      console.log('preparing ' + this.get('name'));
      
      var req = {
        
      }
      
      var v = this.input(data, 'mbid.artist');
      var mbid = v.value;
      if(v) {
        
      } else {
        context.unsupportedInput();
        cb(data);
        return;
      }
      
      var v = this.input(data, 'artist');
      var artistName = '';
      if(v) {
        artistName = v.value;
      }
      
      var t = this.template();
      
      var API = this.API();
      
      this.API().query('artist/musicbrainz:' + mbid, req, function(res) {
        
        var response = res.response;
        
        if(!response.id) {
          cb(data);
          return;
        }
        
        var method = 'artist/' + response.id + '/demographics/myspace/location/country';
        API.query(method, req, function(res) {
          
          if(!res.response) {
            cb(data);
            return;
          }
          
          var s = [];
          _.each(res.response.data.slice(1, 8), function(d) {
            s.push(d.country.name);
          });
          var h = t({
            most_popular: res.response.data[0].country.name,
            list: s.join(' / '),
            artist_name: artistName
          });
          
          context.$el.show();
          context.$content.css('height', 'auto');
          
          context.$content.html(h);
          cb(data);
          
        });
        
      });
      
    }
  }
}


/* template */

<div class="box musicmetric musicmetric-familiarity">
  <h2 class="title">MySpace Popularity</h2>
  <div class="scoop">
    <h3><%= most_popular %></h3>
    <p>has many <%= artist_name %> fans</p>
  </div>
  <div class="list">
    <%= list %>
  </div>
  <div class="credits">
    provided by musicmetrics
  </div>
</div>