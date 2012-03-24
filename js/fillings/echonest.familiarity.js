{
  name: 'familiarity by echnoest',
  key: 'echonest.familiarity',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Displays how familiar an artist currently is to the world',
  API: APIFactory.get('echonest'),
  accepts: ['artist', 'echonest.artist'],
  returns: ['artist', 'echonest.artist'],
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
        
      }
      
      var v = this.input(data, 'echonest.artist');
      if(v) {
        console
        req.id = v.value;
      } else {
        v = this.input(data, 'artist');
        if(v) {
          req.name = v.value;
        } else {
          context.unsupportedInput();
          cb(data);
          return;
        }
      }
      
      var t = this.template();
      
      this.API().query('artist/familiarity', req, function(res) {
        
        var response = res.response;
        
        context.$el.show();
        context.$content.css('height', 'auto');
        
        var h = t({
          score: Math.round(response.artist.familiarity * 100),
          artist_origin: response.artist.name
        });
        
        context.$content.html(h);
        
        data['out'] = [
          {
            type: 'echonest.artist',
            value: response.artist.id
          },
          {
            type: 'artist',
            value: response.artist.name
          },
        ]
        
        cb(data);
      });
      
    }
  }
}


/* template */

<div class="box echonest echonest-familiarity">
  <h2 class="title">Familiarity Score</h2>
  <div class="scoop">
    <h3><%= score %>%</h3>
    <p>for <%= artist_origin %></p>
  </div>
  <div class="credits">
    provided by echonest
  </div>
</div>