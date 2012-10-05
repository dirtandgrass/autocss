(function( $ ) {
  $.fn.autocss = function(opt) {
    var mm = this;
    var settings = $.extend( {
      'selector': this.data('selector') || this,
      'property': this.data('property') || 'background-color',
      'event': this.data('event') || 'change',
      'setSourceBG'    :    true,
      'runOnInit' : true
    }, opt);
    
    var selProp = new Array();   
    if(settings.selector instanceof $)
    {
        selProp[0] = new Object();
        selProp[0]["property"] = settings.property;
        selProp[0]["selector"] = mm;
    } else {
        var selectors = settings.selector.split('|');
        var properties = settings.property.split('|');
        
        for (var i=0; i<selectors.length; i++)
        {
            if(properties[i] != undefined)
            {
                selProp[i] = new Object();
                selProp[i]["selector"] = selectors[i];
                selProp[i]["property"] = properties[i];                 
            }
        }        
    }
   
    this.bind(settings.event,function(o){
        mm.trigger('autocss');
    });
    
    this.bind('autocss', function(o) {
        for(var i = 0; i<selProp.length;i++)
        {
            $(selProp[i]["selector"] instanceof $ ? mm : selProp[i]["selector"]).css(selProp[i]["property"], mm.val());
        }
        if(settings.setSourceBG)
        {
            mm.css("background-color",mm.val());    
        }
        
        if(typeof(settings.after) == "function")
        {
            settings.after(mm);    
        }
                                              
    });
      
      if(settings.runOnInit)
        mm.trigger('autocss');

    return this;
  };
})( jQuery );