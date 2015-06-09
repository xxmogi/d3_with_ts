/// <reference path="../typings/d3/d3.d.ts" />

class Main {
	private h: number = 200;
	private w: number = 400;
	private dataRange: number = 100;
	private numData: number = 40;
	private padding: number = 20;
	private dataset: Array<number> = new Array<number>();

	constructor() {
		for (var i: number = 0; i < this.numData; i++) {
			var val: number = Math.random() * this.dataRange;
			this.dataset.push(val);
		}
	}


	public draw(): void {
		var color: Function = d3.scale.category20b();

		var svg: d3.Selection<number> = d3.select("body")
			.append("svg")
			.attr("width", this.w)
			.attr("height", this.h);

		var rects: d3.Selection<number> = svg.selectAll("rect")
			.data(this.dataset)
			.enter()
			.append("rect");

		var xRange: d3.scale.Linear<number, number> = this.createXrange();
		var yRange: d3.scale.Linear<number, number> = this.createYrange();

		rects
			.attr("x", (data: number, i: number) => {
				return xRange(i);
			})
			.attr("y", (data: number) => {
				return this.h - yRange(data);
			})
			.attr("width", (data: number, i: number) => {
				return (this.w - this.padding * 2) / this.numData - 1;
			})
			.attr("height", (data: number) => {
				return yRange(data);
			})
			.attr("fill", (data: number, i: number) => {
				return color(i);
			});

		rects.on("mouseover", function(data: number, index: number) {
			d3.select(this).
				attr("fill", d3.rgb(color(index)).brighter().toString());
		})
			.on("mouseout", function(data: number, index: number) {
				d3.select(this).
					attr("fill", d3.rgb(color(index)).toString());
			});
	}

	private createXrange(): d3.scale.Linear<number, number> {
		var range: d3.scale.Linear<number, number> = d3.scale.linear();
		range
			.domain([0, this.numData])
			.range([this.padding, this.w - this.padding]);
		return range
	}

	private createYrange(): d3.scale.Linear<number, number> {
		var range: d3.scale.Linear<number, number> = d3.scale.linear();
		range
			.domain([0, this.dataRange])
			.range([this.padding, this.h - this.padding]);
		return range;
	}
}


var app: Main = new Main();
app.draw();

