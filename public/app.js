/// <reference path="../typings/d3/d3.d.ts" />
var Main = (function () {
    function Main() {
        this.h = 200;
        this.w = 400;
        this.dataRange = 100;
        this.numData = 40;
        this.padding = 20;
        this.dataset = new Array();
        for (var i = 0; i < this.numData; i++) {
            var val = Math.random() * this.dataRange;
            this.dataset.push(val);
        }
    }
    Main.prototype.draw = function () {
        var _this = this;
        var color = d3.scale.category20b();
        var svg = d3.select("body")
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h);
        var rects = svg.selectAll("rect")
            .data(this.dataset)
            .enter()
            .append("rect");
        var xRange = this.createXrange();
        var yRange = this.createYrange();
        rects
            .attr("x", function (data, i) {
            return xRange(i);
        })
            .attr("y", function (data) {
            return _this.h - yRange(data);
        })
            .attr("width", function (data, i) {
            return (_this.w - _this.padding * 2) / _this.numData - 1;
        })
            .attr("height", function (data) {
            return yRange(data);
        })
            .attr("fill", function (data, i) {
            return color(i);
        });
        rects.on("mouseover", function (data, index) {
            d3.select(this).
                attr("fill", d3.rgb(color(index)).brighter().toString());
        })
            .on("mouseout", function (data, index) {
            d3.select(this).
                attr("fill", d3.rgb(color(index)).toString());
        });
    };
    Main.prototype.createXrange = function () {
        var range = d3.scale.linear();
        range
            .domain([0, this.numData])
            .range([this.padding, this.w - this.padding]);
        return range;
    };
    Main.prototype.createYrange = function () {
        var range = d3.scale.linear();
        range
            .domain([0, this.dataRange])
            .range([this.padding, this.h - this.padding]);
        return range;
    };
    return Main;
})();
var app = new Main();
app.draw();
//# sourceMappingURL=app.js.map