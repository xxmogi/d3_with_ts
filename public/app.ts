/// <reference path="../typings/d3/d3.d.ts" />

export class Main {
	private h: number = 200;
	private w: number = 700;
	private dataRange: number = 1000;
	private numData: number = 10;
	private padding: number = 20;
	private dataset: Array<Number> = new Array<Number>();
	
	constructor() {
		for (var i: number = 0; i < this.numData; i++) {
			var val: number = Math.random() * this.dataRange;
			this.dataset.push(val);
		}
	}

	
	public draw():void {

		
		var svg: d3.Selection<Number> = d3.select("body")
			.append("svg")
			.attr("width", this.w)
			.attr("height", this.h);

		var rects: d3.Selection<Number> = svg.selectAll("rect")
			.data(this.dataset)
			.enter()
			.append("rect");
			
			var xRange:d3.scale.Linear<number, number> = this.createXrange();
			var yRange:d3.scale.Linear<number, number> = this.createYrange();
			
		rects
			.attr("x", (data: number, i: number) => {
				return xRange(i);
			})
			.attr("y", (data: number) => {
				return this.h - yRange(data);
			})
			.attr("width", (data: number, i: number) => {
				return this.w / this.numData - 1;
			})
			.attr("height", (data: number) => {
				return data;
			});
		
	}
	private createXrange(): d3.scale.Linear<number, number> {
		var range: d3.scale.Linear<number, number> = d3.scale.linear();
		range
			.range([this.padding, this.w - this.padding])
			.domain([0, this.numData]);
		return range
	}

	private createYrange(): d3.scale.Linear<number, number> {
		var range: d3.scale.Linear<number, number> = d3.scale.linear();
		range
			.domain([0, this.dataRange])
			.range([this.h - this.padding, this.padding]);
			return range;
	}
}		


var app:Main = new Main();
app.draw();

