/// <reference path="../typings/d3/d3.d.ts" />
define(["require", "exports"], function (require, exports) {
    var Main = (function () {
        function Main() {
            this.h = 200;
            this.w = 700;
            this.dataRange = 1000;
            this.numData = 10;
            this.padding = 20;
            this.dataset = new Array();
            for (var i = 0; i < this.numData; i++) {
                var val = Math.random() * this.dataRange;
                this.dataset.push(val);
            }
        }
        Main.prototype.draw = function () {
            var _this = this;
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
                return _this.w / _this.numData - 1;
            })
                .attr("height", function (data) {
                return data;
            });
        };
        Main.prototype.createXrange = function () {
            var range = d3.scale.linear();
            range
                .range([this.padding, this.w - this.padding])
                .domain([0, this.numData]);
            return range;
        };
        Main.prototype.createYrange = function () {
            var range = d3.scale.linear();
            range
                .domain([0, this.dataRange])
                .range([this.h - this.padding, this.padding]);
            return range;
        };
        return Main;
    })();
    exports.Main = Main;
    var app = new Main();
    app.draw();
});
//# sourceMappingURL=app.js.map