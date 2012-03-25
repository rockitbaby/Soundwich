{
  name: 'track by tag',
  key: 'soundcloud.trackbytag',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Plays a soundcloud trach for a tag',
  API: APIFactory.get('soundcloud'),
  accepts: ['tag'],
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
        order: 'hotness'
      }
      
      var v = this.input(data, 'tag');
      if(v) {
        req.tags = v.value;
      } else {
        context.unsupportedInput();
        cb(data);
        return;
      }
      
      var t = this.template();
      
      this.API().query('tracks.json', req, function(res) {
        
        console.log(res)
        var response = res;
        
        context.$el.show();
        context.$content.css('height', 'auto');

        var h = t({
          tag: v.value,
          player_url: res[0].uri
        });
        
        context.$content.html(h);
        
        data['out'] = [
          {
            type: 'tag',
            value: response.tag_list
          }
        ]
        
        cb(data);
      });
      
    }
  }
}


/* template */

<div class="box soundcloud soundcloud-terms">
  <h2 class="title">A song tagged <%= tag %></h2>
  <iframe id="sc-widget" src="http://w.soundcloud.com/player/?url=<%= player_url %>" width="100%" height="180" scrolling="no" frameborder="no"></iframe>
  <div class="credits">
    provided by soundcloud
  </div>
</div>