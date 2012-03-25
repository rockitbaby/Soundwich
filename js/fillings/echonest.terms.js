{
  name: 'terms by echnoest',
  key: 'echonest.terms',
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
        'bucket': 'terms'
      }
      
      var v = this.input(data, 'echonest.artist');
      if(v) {
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
      
      this.API().query('artist/profile', req, function(res) {
        
        var response = res.response;
        
        context.$el.show();
        context.$content.css('height', 'auto');
        var terms = '';
        _.each(response.artist.terms, function(term) {
          if(term.frequency > 0.8) {
            terms += '<span class="term" style="font-size: ' + (8 + (term.frequency * 40)) + 'px">' + term.name + ' / </span> ';
          }
        });

        var h = t({
          terms: terms,
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
          {
            type: 'tag',
            value: response.artist.terms[0].name
          }
        ]
        
        cb(data);
      });
      
    }
  }
}


/* template */

<div class="box echonest echonest-terms">
  <h2 class="title">Terms that describe <%= artist_origin %></h2>
  <div class="terms">
    <%= terms %>
  </div>
  <div class="credits">
    provided by echonest
  </div>
</div>