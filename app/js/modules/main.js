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
    counter: 0,
    init: function () {
        this.addObject = this.addObject.bind(this);
        this.query = this.query.bind(this);
    },
    addObject: function (url, callbackFunc) {
        if(this.queryStack.urls[url]){
            this.queryStack.push(url, callbackFunc);
            this.counter++;
        }else{
            this.queryStack.urls[url] = true;
            this.query(callbackFunc, url);
        }
    },
    query: function (callbackFunc, url) {
        $.getJSON(url).done(this.done.bind(this,[callbackFunc, url]))
            .fail(this.error.bind(this,[callbackFunc, url]));
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
        this.always(args[1]);
    },
    error: function (args, data) {
        console.log(data);
        this.always(args[1]);
    },
    always: function (url) {
        console.log(this.queryStack);
        console.log(this.queryStack.isQuery(url));
        if(this.queryStack.isQuery(url)){
            var query = this.queryStack.pop(url);
            this.query(query.callbackFunc, query.url);
        }
        else
            this.queryStack.urls[url] = false;

    },
    queryStack: {
        items: [],
        urls: {},
        isQuery: function (url) {
            return !!this.items[url].length;
        },
        push: function (url, callbackFunc) {
            var item = {
                url: url,
                callbackFunc: callbackFunc
            };
            this.urls[url] = true;
            if(!this.items[url])
                this.items[url] = [];
            this.items[url].push(item);

        },
        pop: function (url) {
            return this.items[url].shift();
        }
    }
};

(function () {
    header.init();
    app.init();
})();