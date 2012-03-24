define([
  'jquery'
  , 'require/text!templates/soundwich.haml' + '?'  + (new Date).getTime()
],
function (
  $
  , template
) {
  var SoundwichView = Backbone.View.extend({
  
    events: {
      'click .add-filling': 'addNewFilling',
      'click .filling': 'zoomTo',
      'click .zoom-in': 'zoomInClicked',
      'click .zoom-out': 'zoomOutClicked',
      'click .restart': 'restartClicked',
    },
    
    $rendering: $,
    $scroller: $,
    $actions: $,
    $filling: $,
    scroller: null,
    fitted: false,
    initialInput: null,
    initialize: function(model, initialInput) {
      this.model = model;
      this.initialInput = initialInput;
      this.model.get('fillings').orderdFillings();
      
    },
    
    render: function() {
      
      this.template = Haml(template);
      
      var data = this.model.toJSON();
      data.fillings = this.model.get('fillings').orderdFillings();
      _.each(data.fillings, function(fill, ix) {
        data.fillings[ix] = fill.toJSON();
      });
      console.log(data.fillings);
      this.el = this.$el = $(this.template(data));
      this.$rendering = this.$el.find('.rendering');
      this.$scroller = this.$el.find('.soundwich-scroller');
      this.$actions = this.$el.find('.actions');
      this.$fillings = this.$el.find('.fillings');
      
      this.delegateEvents();
      
      return this;
    },
    
    
    prepare: function() {
      this.i = 0;
      
      /*
      this.nextFilling({
        'in': null,
        'out': [{
          type: 'mbid.track',
          value: '9f7bac6a-0231-4fc3-b277-2a4c000ee606'
        }]
      });
      */
      this.nextFilling({
        'in': null,
        'out': [this.initialInput]
      });
    },
    
    nextFilling: function(data) {
      var fillings = this.model.get('fillings');
      
      var model = fillings.getNextToPrepare();
      
      data['in'] = data['out'];
      
      if(model) {
        var context = {
          $el: this.$el.find('#' + model.get('domID')),
          $content: this.$el.find('#' + model.get('domID') + ' .content'),
          choose: _.bind(this.choose, this),
          unsupportedInput: _.bind(this.choose, this)
        }
        model.prepare(data, context, _.bind(this.nextFilling, this));
      } else {
        console.log("DONE SANDWICH MADE!!!");
      }
      
      this.fitIntoWindow();
    },
    
    choose: function(text, choices, cb) {
      cb(choices[Math.floor(Math.random() * choices.length)]);
    },
    
    unsupportedInput: function() {
      alert("Unsupported");
    },
    
    afterRender: function() {
      
      
      var id = _.uniqueId('soundwich-');
      this.$scroller.attr('id', id);
      
      this.scroller = new iScroll(id, {
        momentum: true,
        hScrollbar: false,
        hScroll: false,
        vScrollbar: true,
        vScroll: true,
        useTransition: true,
        /*
        onScrollMove: _.bind(this.onScrollMove, this),
        onScrollStart: _.bind(this.onScrollStart, this),
        onBeforeScrollEnd: _.bind(this.onBeforeScrollEnd, this),
        onTouchEnd: _.bind(this.onTouchEnd, this)
        */
      });
      
      this.fitIntoWindow();
      this.prepare();
      
    },
    
    addNewFilling: function(e) {
      e.preventDefault();
      this.addFillingToFillings();
    },
    
    restartClicked: function(e) {
      
    },
    
    restart: function() {
      
    },
    
    zoomTo: function(e) {
      e.preventDefault();
      
      var $el = $(e.target);
      if(!$el.hasClass('filling')) {
        $el = $el.parents('.filling');
      }
      
      this.zoomIn();
      this.scroller.scrollToElement($el.get(0));
      
    },
    
    zoomIn: function() {
      
      var appH = $('.soundwiches').height();
      
      this.$rendering.transition({scale: 1}, 300);
      this.$scroller.height(appH);
      
      this.fitted = false;
      this.$el.find('.zoom-in').hide();
      this.$el.find('.zoom-out').show();
      
      this.scroller.refresh();
      this.scroller.enable();
    },
    
    zoomOut: function() {
      
    },
    
    zoomInClicked: function(e) {
      e.preventDefault();
      this.zoomIn();
    },
    
    zoomOutClicked: function(e) {
      e.preventDefault();
      this.fitIntoWindow();
    },
    
    addFillingToFillings: function() {
      
      var colors = ['#c91f3f', '#44c910', '#890465', '#ebe1aa'];
      var color = colors[Math.floor(Math.random() * colors.length)];
      var height = 80 + Math.floor(Math.random() * 300);
      
      var seps = ['sep-bread', 'sep-ketchup', 'sep-salad', 'sep-mayonaise', 'sep-xx'];
      var sep = seps[Math.floor(Math.random() * seps.length - 1)];
        
      this.$el.find('.fillings').prepend('<div class="filling" style="background-color: ' + color + '; height: ' + height + 'px">Filling</div><div class="sep ' + sep + '"></div>');
      this.fitIntoWindow();
    },
    
    fitIntoWindow: function() {
      
      this.$el.find('.zoom-in').show();
      this.$el.find('.zoom-out').hide();
      
      this.scroller.scrollTo(0, 0);
      this.scroller.disable();
      this.$scroller.css('height', 'auto');
      
      //this.$rendering.css('-webkit-transform', 'scale(1) translateX(0)');
      var h = this.$rendering.height();
      var appH = $('.soundwiches').height();
      
      console.log("Soundwich Height " + h);
      console.log("App Height " + appH);
      
      var extraSpace = 0;
      h += extraSpace;
      var scale = 1;
      if(h > appH) {
        scale = (appH / h);
        this.$rendering.transition({scale: scale}, 300);
      }
      
      this.fitted = true;
      this.$el.height(this.$rendering.height() * scale + 60);
    },
    
    zoomScrollToFilling: function() {
      
    },
        
  });
  return SoundwichView;
});