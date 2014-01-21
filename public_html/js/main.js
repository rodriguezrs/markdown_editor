var app = {
    editor : $('.editor'),
    input : $('.editor-input'),
    content: $('.editor-content'),
    converter: new Showdown.converter(),
    init: function(e){
        for(var key in this.events){
            if(this.events.hasOwnProperty(key)){
                this.input.bind(key, this.events[key]);
            }
        }
    },
    events: {
        keypress: function(e){
            var code = e.keyCode || e.which;
            switch(code){
                case 13:
                    app.utils.onEnter();
                    break;
                case 8:
                    app.utils.isOnEmpty();
                    break;
            }
        }
    },
    utils: {
        onEnter : function(){
            
            var html_holder = $("<div></div>").addClass('editor-content');
            var raw_holder = $("<div></div>").addClass('editor-raw');
            
            raw_holder.text(app.input.val());
            html_holder.html(app.converter.makeHtml(app.input.val() || "&nbsp;"));

            app.input.before(raw_holder).before(html_holder);
            app.input.val("");
        },
        isOnEmpty: function(){
            console.log('isOnEmpty');
            if(app.input.val().length == 0){
                this.makeEditable();
            }
        },
        makeEditable: function(){
            console.log('makeEditable');
            var html = app.input.prev('.editor-content');
            var raw = html.prev('.editor-raw');
            
            
            app.input.val(raw.text() + " ");
            html.remove();
            raw.remove();
        }
    }
};

$(document).ready(function(){
    app.init();
});
