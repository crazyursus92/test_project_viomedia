/**
 * Created by ursus on 26.12.2015.
 */

 var header = {
    headerElement: {},
    pointOne: {},
    pointTwo: {},
    init: function () {
        this.headerElement = document.querySelector(".block__1");
        this.pointOne = document.querySelector(".block__border__1");
        this.pointTwo = document.querySelector(".block__border__2");
        var haderWaypointOne =  new Waypoint({
            element: this.pointOne,
            handler: this.headerWaypointCallbackOne,
            offset: 'bottom-in-view'
        });
        var haderWaypointTwo =  new Waypoint({
            element: this.pointTwo,
            handler: this.headerWaypointCallbackTwo,
            offset: 100
        });
    },
    headerWaypointCallbackOne: function (direction) {
        if(direction === "up")
            header.headerElement.classList.remove("block__fixed");
        else
            header.headerElement.classList.add("block__fixed");
    },
    headerWaypointCallbackTwo: function (direction) {
        if(direction === "up"){
            header.headerElement.classList.remove("block__absolute");
            header.headerElement.style.top = 0 + "px";
        }
        else {
            header.headerElement.classList.add("block__absolute");
            var top = $(header.pointTwo).offset().top - 100;
            header.headerElement.style.top = top + "px";
        }

    }
};


var app = {
    init: function () {

    },
    addObject: function (url, callbackFunc) {
        var that = this;
        if(this.queryStack.isQuery(url)){
            this.queryStack.push(url, callbackFunc);
        }else{
            $.getJSON(url).done(this.done.bind(this,[callbackFunc]))
                .fail(this.error.bind(this,[callbackFunc]))
                .always(function () {
                if(that.queryStack.isQuery(url)){
                    var query = that.queryStack.pop(url);
                    that.addObject(query.url, query.callbackFunc);
                }
            });
        }
    },
    done: function (args, data) {
        if(typeof args[0] === "function"){
            var element = document.createElement(data.tag);
            element.textContent = data.content;
            for(var attr in data.attr){
                element.setAttribute(attr, data.attr[attr]);
            }
            for(var event in data.events){
                element.addEventListener(event, function () {
                    try{
                        eval(data.events[event]);
                    }
                    finally{}
                });
            }
            for(var style in data.style){
                element.style[style] = data.style[style];
            }
            args[0](element);
        }
    },
    error: function (data) {
        console.log(data);
    },
    queryStack: {
        items: [],
        urls: {},

        isQuery: function (url) {
            return !!this.urls[url];
        },
        push: function (url, callbackFunc) {
            var item = {
                url: url,
                callbackFunc: callbackFunc
            };
            this.urls[url] = this.urls[url] > 0 ? this.urls[url]++ : 1;
            if(!this.items[url])
                this.items[url] = [];
            this.items[url].push(item);

        },
        pop: function (url) {
            this.urls[url]--;
            return this.items[url].shift();
        }
    }
};

(function () {
    header.init();
})();


