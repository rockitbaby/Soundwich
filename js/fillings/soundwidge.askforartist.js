{
  name: 'aks for artist',
  key: 'soundwidge.askforartist',
  author: 'Michael Schieben <babre@rockitbaby.de>',
  description: 'Asks for artist',
  API:  null,
  accepts: [],
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
      var callback = function(userInput) {
        
        if(_.trim(userInput) == '') {
          getUserInput();
          return;
        }
        
        data['out'] = [{
          type: 'artist',
          value: userInput
        }];
        
        var h = t({
          'artist_name': userInput,
          'subline': parameter.subline
        });
        
        context.$el.show();
        context.$content.css('height', 'auto');
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
    <h3><%= artist_name %></h3>
    <p><%= subline %></p>
  </div>
  <div class="credits">
    
  </div>
</div>