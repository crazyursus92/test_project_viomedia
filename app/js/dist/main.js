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
        console.log(direction);
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
/*
var ajaxCallback = function (obj) {
    console.log(obj);
    $("body").append( $( obj ) );
};
var test = function () {
    app.addObject("http://test.ru/ajax.php?1", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?1", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?1", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?2", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?2", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?3", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?3", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?3", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?3", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?5", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?4", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?4", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?5", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?5", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?3", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?3", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?5", ajaxCallback);
    app.addObject("http://test.ru/ajax.php?2", ajaxCallback);
    console.log(app.queryStack);
};

test();*/

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJ0ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaGVhZGVyID0ge1xyXG4gICAgaGVhZGVyRWxlbWVudDoge30sXHJcbiAgICBwb2ludE9uZToge30sXHJcbiAgICBwb2ludFR3bzoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibG9ja19fMVwiKTtcclxuICAgICAgICB0aGlzLnBvaW50T25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibG9ja19fYm9yZGVyX18xXCIpO1xyXG4gICAgICAgIHRoaXMucG9pbnRUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJsb2NrX19ib3JkZXJfXzJcIik7XHJcbiAgICAgICAgdmFyIGhhZGVyV2F5cG9pbnRPbmUgPSAgbmV3IFdheXBvaW50KHtcclxuICAgICAgICAgICAgZWxlbWVudDogdGhpcy5wb2ludE9uZSxcclxuICAgICAgICAgICAgaGFuZGxlcjogdGhpcy5oZWFkZXJXYXlwb2ludENhbGxiYWNrT25lLFxyXG4gICAgICAgICAgICBvZmZzZXQ6ICdib3R0b20taW4tdmlldydcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgaGFkZXJXYXlwb2ludFR3byA9ICBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLnBvaW50VHdvLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiB0aGlzLmhlYWRlcldheXBvaW50Q2FsbGJhY2tUd28sXHJcbiAgICAgICAgICAgIG9mZnNldDogMTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaGVhZGVyV2F5cG9pbnRDYWxsYmFja09uZTogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gXCJ1cFwiKVxyXG4gICAgICAgICAgICBoZWFkZXIuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYmxvY2tfX2ZpeGVkXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgaGVhZGVyLmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJsb2NrX19maXhlZFwiKTtcclxuICAgIH0sXHJcbiAgICBoZWFkZXJXYXlwb2ludENhbGxiYWNrVHdvOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSBcInVwXCIpe1xyXG4gICAgICAgICAgICBoZWFkZXIuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYmxvY2tfX2Fic29sdXRlXCIpO1xyXG4gICAgICAgICAgICBoZWFkZXIuaGVhZGVyRWxlbWVudC5zdHlsZS50b3AgPSAwICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaGVhZGVyLmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJsb2NrX19hYnNvbHV0ZVwiKTtcclxuICAgICAgICAgICAgdmFyIHRvcCA9ICQoaGVhZGVyLnBvaW50VHdvKS5vZmZzZXQoKS50b3AgLSAxMDA7XHJcbiAgICAgICAgICAgIGhlYWRlci5oZWFkZXJFbGVtZW50LnN0eWxlLnRvcCA9IHRvcCArIFwicHhcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbnZhciBhcHAgPSB7XHJcbiAgICBjb3VudGVyOiAwLFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWRkT2JqZWN0ID0gdGhpcy5hZGRPYmplY3QuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS5iaW5kKHRoaXMpO1xyXG4gICAgfSxcclxuICAgIGFkZE9iamVjdDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2tGdW5jKSB7XHJcbiAgICAgICAgaWYodGhpcy5xdWVyeVN0YWNrLnVybHNbdXJsXSl7XHJcbiAgICAgICAgICAgIHRoaXMucXVlcnlTdGFjay5wdXNoKHVybCwgY2FsbGJhY2tGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5jb3VudGVyKys7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucXVlcnlTdGFjay51cmxzW3VybF0gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5KGNhbGxiYWNrRnVuYywgdXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcXVlcnk6IGZ1bmN0aW9uIChjYWxsYmFja0Z1bmMsIHVybCkge1xyXG4gICAgICAgICQuZ2V0SlNPTih1cmwpLmRvbmUodGhpcy5kb25lLmJpbmQodGhpcyxbY2FsbGJhY2tGdW5jLCB1cmxdKSlcclxuICAgICAgICAgICAgLmZhaWwodGhpcy5lcnJvci5iaW5kKHRoaXMsW2NhbGxiYWNrRnVuYywgdXJsXSkpO1xyXG4gICAgfSxcclxuICAgIGRvbmU6IGZ1bmN0aW9uIChhcmdzLCBkYXRhKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIGFyZ3NbMF0gPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChkYXRhLnRhZyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGZvcih2YXIgYXR0ciBpbiBkYXRhLmF0dHIpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgZGF0YS5hdHRyW2F0dHJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGRhdGEuZXZlbnRzKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChkYXRhLmV2ZW50c1tldmVudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5e31cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIgc3R5bGUgaW4gZGF0YS5zdHlsZSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW3N0eWxlXSA9IGRhdGEuc3R5bGVbc3R5bGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZ3NbMF0oZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWx3YXlzKGFyZ3NbMV0pO1xyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoYXJncywgZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuYWx3YXlzKGFyZ3NbMV0pO1xyXG4gICAgfSxcclxuICAgIGFsd2F5czogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucXVlcnlTdGFjayk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5xdWVyeVN0YWNrLmlzUXVlcnkodXJsKSk7XHJcbiAgICAgICAgaWYodGhpcy5xdWVyeVN0YWNrLmlzUXVlcnkodXJsKSl7XHJcbiAgICAgICAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcnlTdGFjay5wb3AodXJsKTtcclxuICAgICAgICAgICAgdGhpcy5xdWVyeShxdWVyeS5jYWxsYmFja0Z1bmMsIHF1ZXJ5LnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5xdWVyeVN0YWNrLnVybHNbdXJsXSA9IGZhbHNlO1xyXG5cclxuICAgIH0sXHJcbiAgICBxdWVyeVN0YWNrOiB7XHJcbiAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgIHVybHM6IHt9LFxyXG4gICAgICAgIGlzUXVlcnk6IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5pdGVtc1t1cmxdLmxlbmd0aDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHB1c2g6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrRnVuYykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tGdW5jOiBjYWxsYmFja0Z1bmNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy51cmxzW3VybF0gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZighdGhpcy5pdGVtc1t1cmxdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1t1cmxdID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbdXJsXS5wdXNoKGl0ZW0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBvcDogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1t1cmxdLnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIGhlYWRlci5pbml0KCk7XHJcbiAgICBhcHAuaW5pdCgpO1xyXG59KSgpOyIsIi8qXHJcbnZhciBhamF4Q2FsbGJhY2sgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBjb25zb2xlLmxvZyhvYmopO1xyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKCAkKCBvYmogKSApO1xyXG59O1xyXG52YXIgdGVzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGFwcC5hZGRPYmplY3QoXCJodHRwOi8vdGVzdC5ydS9hamF4LnBocD8xXCIsIGFqYXhDYWxsYmFjayk7XHJcbiAgICBhcHAuYWRkT2JqZWN0KFwiaHR0cDovL3Rlc3QucnUvYWpheC5waHA/MVwiLCBhamF4Q2FsbGJhY2spO1xyXG4gICAgYXBwLmFkZE9iamVjdChcImh0dHA6Ly90ZXN0LnJ1L2FqYXgucGhwPzFcIiwgYWpheENhbGxiYWNrKTtcclxuICAgIGFwcC5hZGRPYmplY3QoXCJodHRwOi8vdGVzdC5ydS9hamF4LnBocD8yXCIsIGFqYXhDYWxsYmFjayk7XHJcbiAgICBhcHAuYWRkT2JqZWN0KFwiaHR0cDovL3Rlc3QucnUvYWpheC5waHA/MlwiLCBhamF4Q2FsbGJhY2spO1xyXG4gICAgYXBwLmFkZE9iamVjdChcImh0dHA6Ly90ZXN0LnJ1L2FqYXgucGhwPzNcIiwgYWpheENhbGxiYWNrKTtcclxuICAgIGFwcC5hZGRPYmplY3QoXCJodHRwOi8vdGVzdC5ydS9hamF4LnBocD8zXCIsIGFqYXhDYWxsYmFjayk7XHJcbiAgICBhcHAuYWRkT2JqZWN0KFwiaHR0cDovL3Rlc3QucnUvYWpheC5waHA/M1wiLCBhamF4Q2FsbGJhY2spO1xyXG4gICAgYXBwLmFkZE9iamVjdChcImh0dHA6Ly90ZXN0LnJ1L2FqYXgucGhwPzNcIiwgYWpheENhbGxiYWNrKTtcclxuICAgIGFwcC5hZGRPYmplY3QoXCJodHRwOi8vdGVzdC5ydS9hamF4LnBocD81XCIsIGFqYXhDYWxsYmFjayk7XHJcbiAgICBhcHAuYWRkT2JqZWN0KFwiaHR0cDovL3Rlc3QucnUvYWpheC5waHA/NFwiLCBhamF4Q2FsbGJhY2spO1xyXG4gICAgYXBwLmFkZE9iamVjdChcImh0dHA6Ly90ZXN0LnJ1L2FqYXgucGhwPzRcIiwgYWpheENhbGxiYWNrKTtcclxuICAgIGFwcC5hZGRPYmplY3QoXCJodHRwOi8vdGVzdC5ydS9hamF4LnBocD81XCIsIGFqYXhDYWxsYmFjayk7XHJcbiAgICBhcHAuYWRkT2JqZWN0KFwiaHR0cDovL3Rlc3QucnUvYWpheC5waHA/NVwiLCBhamF4Q2FsbGJhY2spO1xyXG4gICAgYXBwLmFkZE9iamVjdChcImh0dHA6Ly90ZXN0LnJ1L2FqYXgucGhwPzNcIiwgYWpheENhbGxiYWNrKTtcclxuICAgIGFwcC5hZGRPYmplY3QoXCJodHRwOi8vdGVzdC5ydS9hamF4LnBocD8zXCIsIGFqYXhDYWxsYmFjayk7XHJcbiAgICBhcHAuYWRkT2JqZWN0KFwiaHR0cDovL3Rlc3QucnUvYWpheC5waHA/NVwiLCBhamF4Q2FsbGJhY2spO1xyXG4gICAgYXBwLmFkZE9iamVjdChcImh0dHA6Ly90ZXN0LnJ1L2FqYXgucGhwPzJcIiwgYWpheENhbGxiYWNrKTtcclxuICAgIGNvbnNvbGUubG9nKGFwcC5xdWVyeVN0YWNrKTtcclxufTtcclxuXHJcbnRlc3QoKTsqL1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
