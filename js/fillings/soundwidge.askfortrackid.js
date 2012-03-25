{
  name: 'aks for track id',
  key: 'soundwidge.askfortrackid',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Asks for track id',
  API:  null,
  accepts: [],
  returns: ['mbid.track'],
  parameter: {
    question: 'Enter a musicbrainz track id:',
    defaultValue: '028efe7f-cdfb-4135-846f-848f2fff15b1',
    subline: 'is the musicbrainz track id you\'ve entered'
  },
  exec: {
    prepare: function(data, parameter, context, cb) {
      
      console.log('========= ========= ========= ========= ');
      console.log('preparing ' + this.get('name'));
      
      var t = this.template();
      var callback = function(userInput) {
        
        if(_.trim(userInput) == '') {
          getUserInput();
          return;
        }
        
        data['out'] = [{
          type: 'mbid.track',
          value: userInput
        }];
        
        var h = t({
          'track_id': userInput,
          'subline': parameter.subline
        });
        
        context.$el.show();
        context.$el.css('height', 'auto');
        context.$content.html(h);
        
        cb(data);
      }
      
      var getUserInput = function(data) {
        context.userInput(
          parameter.question,
          parameter.defaultValue,
          _.bind(callback, this)
        );
      }
      
      getUserInput();
      
    }
  }
}

/* template */

<div class="box soundwidge soundwidge-artist">
  <h2 class="title">Your Input</h2>
  <div class="scoop">
    <h3><%= track_id %></h3>
    <p><%= subline %></p>
  </div>
  <div class="credits">
    
  </div>
</div>