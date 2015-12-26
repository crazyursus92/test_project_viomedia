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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVyc3VzIG9uIDI2LjEyLjIwMTUuXHJcbiAqL1xyXG5cclxuIHZhciBoZWFkZXIgPSB7XHJcbiAgICBoZWFkZXJFbGVtZW50OiB7fSxcclxuICAgIHBvaW50T25lOiB7fSxcclxuICAgIHBvaW50VHdvOiB7fSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJsb2NrX18xXCIpO1xyXG4gICAgICAgIHRoaXMucG9pbnRPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJsb2NrX19ib3JkZXJfXzFcIik7XHJcbiAgICAgICAgdGhpcy5wb2ludFR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmxvY2tfX2JvcmRlcl9fMlwiKTtcclxuICAgICAgICB2YXIgaGFkZXJXYXlwb2ludE9uZSA9ICBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLnBvaW50T25lLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiB0aGlzLmhlYWRlcldheXBvaW50Q2FsbGJhY2tPbmUsXHJcbiAgICAgICAgICAgIG9mZnNldDogJ2JvdHRvbS1pbi12aWV3J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBoYWRlcldheXBvaW50VHdvID0gIG5ldyBXYXlwb2ludCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMucG9pbnRUd28sXHJcbiAgICAgICAgICAgIGhhbmRsZXI6IHRoaXMuaGVhZGVyV2F5cG9pbnRDYWxsYmFja1R3byxcclxuICAgICAgICAgICAgb2Zmc2V0OiAxMDBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoZWFkZXJXYXlwb2ludENhbGxiYWNrT25lOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSBcInVwXCIpXHJcbiAgICAgICAgICAgIGhlYWRlci5oZWFkZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJibG9ja19fZml4ZWRcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBoZWFkZXIuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tfX2ZpeGVkXCIpO1xyXG4gICAgfSxcclxuICAgIGhlYWRlcldheXBvaW50Q2FsbGJhY2tUd286IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgICAgICBpZihkaXJlY3Rpb24gPT09IFwidXBcIil7XHJcbiAgICAgICAgICAgIGhlYWRlci5oZWFkZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJibG9ja19fYWJzb2x1dGVcIik7XHJcbiAgICAgICAgICAgIGhlYWRlci5oZWFkZXJFbGVtZW50LnN0eWxlLnRvcCA9IDAgKyBcInB4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBoZWFkZXIuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tfX2Fic29sdXRlXCIpO1xyXG4gICAgICAgICAgICB2YXIgdG9wID0gJChoZWFkZXIucG9pbnRUd28pLm9mZnNldCgpLnRvcCAtIDEwMDtcclxuICAgICAgICAgICAgaGVhZGVyLmhlYWRlckVsZW1lbnQuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxudmFyIGFwcCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgYWRkT2JqZWN0OiBmdW5jdGlvbiAodXJsLCBjYWxsYmFja0Z1bmMpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgaWYodGhpcy5xdWVyeVN0YWNrLmlzUXVlcnkodXJsKSl7XHJcbiAgICAgICAgICAgIHRoaXMucXVlcnlTdGFjay5wdXNoKHVybCwgY2FsbGJhY2tGdW5jKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJC5nZXRKU09OKHVybCkuZG9uZSh0aGlzLmRvbmUuYmluZCh0aGlzLFtjYWxsYmFja0Z1bmNdKSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKHRoaXMuZXJyb3IuYmluZCh0aGlzLFtjYWxsYmFja0Z1bmNdKSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5xdWVyeVN0YWNrLmlzUXVlcnkodXJsKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gdGhhdC5xdWVyeVN0YWNrLnBvcCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkT2JqZWN0KHF1ZXJ5LnVybCwgcXVlcnkuY2FsbGJhY2tGdW5jKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRvbmU6IGZ1bmN0aW9uIChhcmdzLCBkYXRhKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIGFyZ3NbMF0gPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChkYXRhLnRhZyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGZvcih2YXIgYXR0ciBpbiBkYXRhLmF0dHIpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgZGF0YS5hdHRyW2F0dHJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGRhdGEuZXZlbnRzKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChkYXRhLmV2ZW50c1tldmVudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5e31cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIgc3R5bGUgaW4gZGF0YS5zdHlsZSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW3N0eWxlXSA9IGRhdGEuc3R5bGVbc3R5bGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZ3NbMF0oZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfSxcclxuICAgIHF1ZXJ5U3RhY2s6IHtcclxuICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgdXJsczoge30sXHJcblxyXG4gICAgICAgIGlzUXVlcnk6IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy51cmxzW3VybF07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwdXNoOiBmdW5jdGlvbiAodXJsLCBjYWxsYmFja0Z1bmMpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuYzogY2FsbGJhY2tGdW5jXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudXJsc1t1cmxdID0gdGhpcy51cmxzW3VybF0gPiAwID8gdGhpcy51cmxzW3VybF0rKyA6IDE7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLml0ZW1zW3VybF0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW3VybF0gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtc1t1cmxdLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9wOiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXJsc1t1cmxdLS07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zW3VybF0uc2hpZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgaGVhZGVyLmluaXQoKTtcclxufSkoKTtcclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
