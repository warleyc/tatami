(function(Backbone, Tatami){

    var Statuses = Backbone.Collection.extend({
        initialize: function(){
            this.initNext();
            this.initRefresh();
        },
        model: Tatami.Models.Statuses,
        initNext: function(){
            var self = this;
            this.next = _.once(function(cb){
                var options = {
                    remove:false,
                    merge:true,
                    success: function(collection, response){
                        if(response.length > 1) self.initNext();
                        if (cb) cb();
                    }
                };
                if(self.last())
                    options = _.extend(options, {
                        data: {
                            max_id: self.last().id
                        }
                    });
                return self.fetch(options);
            });
        },
        initRefresh: function(){
            var self = this;
            this.refresh = _.once(function(cb){
                var options = {
                    remove:false,
                    merge:true,
                    at:0,
                    success: function(){
                        Tatami.app.trigger('statusPending', self.filter(function(model){
                            return model.hidden;
                        }));
                        self.initRefresh();
                        if (cb) cb();
                    }
                };
                if(self.first())
                    options = _.extend(options, {
                        data: {
                            since_id: self.first().id
                        }
                    });
                return self.fetch(options);
            });
        }
    });

    var StatusesTimeline = Statuses.extend({
        url: '/tatami/rest/statuses/home_timeline'
    });

    var StatusesFavorites = Statuses.extend({
        url: '/tatami/rest/statuses/home_timeline'
    });

    var StatusesMentions = Statuses.extend({
        model: Tatami.Models.Statuses,
        url: '/tatami/rest/statuses/home_timeline'
    });

    Tatami.Collections.StatusesTimeline = StatusesTimeline;
    Tatami.Collections.StatusesFavorites = StatusesFavorites;
    Tatami.Collections.StatusesMentions = StatusesMentions;

})(Backbone, Tatami);