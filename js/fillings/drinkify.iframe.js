{
  name: 'aks for artist',
  key: 'drinkify.iframe',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'What should I drink',
  API:  null,
  accepts: ['artist'],
  returns: ['artist'],
  parameter: {
    question: 'What is your most favorite artist',
    defaultValue: 'The Beatles',
    subline: 'is your favorite artist'
  },
  exec: {
    prepare: function(data, parameter, context, cb) {
      
      console.log('========= ========= ========= ========= ');
      console.log('preparing ' + this.get('name'));
      
      var t = this.template();
      
      v = this.input(data, 'artist');
      if(v) {
         
      } else {
        context.unsupportedInput();
        cb(data);
        return;
      }
      
      var h = t({
        'drinkyfy_url': 'http://drinkify.org/' + encodeURI(v.value)
      });
      
      context.$el.show();
      context.$content.css('height', 600);
      context.$content.html(h);
      
      cb(data);
      
    }
  }
}

/* template */

<div class="box drinkify drinkify-artist">
  <iframe src="<%= drinkyfy_url %>" width="100%" height="500"></iframe>
  <div class="credits">
    <a href="<%= drinkyfy_url %>">See fullscreen</a>
  </div>
</div>