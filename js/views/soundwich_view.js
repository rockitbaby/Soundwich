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
      'click .filling': 'zoomToClicked',
      'click .zoom-in': 'zoomInClicked',
      'click .zoom-out': 'zoomOutClicked',
      'click .restart': 'restartClicked',
      'click .submit': 'submitClicked',
    },
    
    $rendering: $,
    $scroller: $,
    $actions: $,
    $filling: $,
    scroller: null,
    fitted: false,
    
    initialize: function(model) {
      this.model = model;
      this.initialInput = null;
      this.model.get('fillings').orderdFillings();
      
    },
    
    render: function($el) {
      
      this.template = Haml(template);
      
      var data = this.model.toJSON();
      data.fillings = this.model.get('fillings').orderdFillings();
      _.each(data.fillings, function(fill, ix) {
        data.fillings[ix] = fill.toJSON();
      });
      this.el = this.$el = $(this.template(data));
      this.$rendering = this.$el.find('.rendering');
      this.$scroller = this.$el.find('.soundwich-scroller');
      this.$actions = this.$el.find('.actions');
      this.$fillings = this.$el.find('.fillings');
      this.$userInput = this.$el.find('.user-input');
      
      this.$el.addClass('empty');
      
      this.delegateEvents();
      
      return this;
    },
    
    
    prepare: function() {
      this.i = 0;
      
      this.nextFilling({
        'in': null,
        'out': null
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
          userInput: _.bind(this.userInput, this),
          choose: _.bind(this.choose, this),
          unsupportedInput: _.bind(this.choose, this)
        }
        
        _.delay(_.bind(function() {
          model.prepare(data, context, _.bind(this.nextFilling, this));
        }, this), 500);
        
      } else {
        console.log("DONE SANDWICH MADE!!!");
        
        /*
        this.scroller.refresh();
        this.scroller.scrollTo(0, 0);
        _.delay(_.bind(function() {
          console.log("HIII INTO");
          this.fitIntoWindow();
        }, this), 1500);
        */
      }
      
      this.fitIntoWindow();
    },
    
    choose: function(text, choices, cb) {
      if(!_.isUndefined(cb)) {
        cb('');
      }
      return;
      cb(choices[Math.floor(Math.random() * choices.length)]);
    },
    
    unsupportedInput: function() {
      alert("Unsupported");
    },
    
    afterRender: function() {
      
      this.$el.removeClass('empty');
      
      var h = $(window).height();
      $('.soundwiches').height(h - 60);
      var appH = $('.soundwiches').height();
      
      console.log("SETTING APP HEIGHT");
      console.log(appH);
      this.$el.height(appH - 60);
      
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
      e.preventDefault();
      this.restart();
    },
    
    restart: function() {
      
      var old = this.$el;
      this.model.reset();
      this.render();
      old.replaceWith(this.$el);
      this.afterRender();
    },
    
    userInputCallback: null,
    userInput: function(question, defaultValue, cb) {
      this.userInputCallback = cb;
      this.$userInput.find('.question').text(question);
      this.$userInput.show();
      this.$userInput.find('input').val(defaultValue).focus();
      this.$userInput.css(({'background-color': '#FF0'})).animate({'background-color': '#222'}, 400);
    },
    
    submitClicked: function(e) {
      this.$userInput.hide();
      if(_.isFunction(this.userInputCallback)) {
        this.userInputCallback.apply(this, [this.$userInput.find('input').val()]);
      }
    },
    
    zoomToClicked: function(e) {
      e.preventDefault();
      
      var $el = $(e.target);
      if(!$el.hasClass('filling')) {
        $el = $el.parents('.filling');
      }
      
      this.zoomTo($el);
    },
    
    zoomTo: function($el) {
      this.zoomIn($el);
      this.scroller.scrollToElement($el.get(0));
    },
    
    zoomIn: function() {
      
      var appH = this.availableHeight();
      
      this.$rendering.transition({scale: 1}, 300);
      
      this.$scroller.height(appH);
      
      this.fitted = false;
      this.$el.find('.zoom-in').hide();
      this.$el.find('.zoom-out').show();
      
      this.scroller.refresh();
      this.scroller.enable();
    },
    
    zoomInClicked: function(e) {
      e.preventDefault();
      this.zoomIn();
      _.delay(_.bind(function() {
        console.log(this.scroller.x);
        var $el = this.$el.find('.filling').last();
        console.log($el);
        this.scroller.scrollToElement($el.get(0), 200);
      }, this), 10);
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
    
    availableHeight: function () {
      return appH = $('.soundwiches').height() - 60;
    },
    
    
    fitIntoWindow: function() {
      
      this.$el.find('.zoom-in').show();
      this.$el.find('.zoom-out').hide();
      
      this.scroller.scrollTo(0, 0);
      this.scroller.disable();
      this.$scroller.css('height', 'auto');
      
      //this.$rendering.css('-webkit-transform', 'scale(1) translateX(0)');
      var h = this.$rendering.height();
      var appH = this.availableHeight();
      
      var scale = 1;
      if(h > appH) {
        scale = (appH / h);
        this.$rendering.transition({scale: scale}, 300);
      }
      
      this.fitted = true;
      if(scale < 1) {
        this.$el.height(this.$rendering.height() * scale + 60);
      } else {
        this.$el.height(appH);
      }
      
    },
    
    zoomScrollToFilling: function() {
      
    },
        
  });
  return SoundwichView;
});