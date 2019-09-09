datos = [{
			"x_axis": 30,
			"y_axis": 30, 
			"radius": 6, 
			"color" : "green",
			'alturas':[5,6,7,2,9]
		},
		{
			"x_axis": 70, 
			"y_axis": 70, 
			"radius": 4, 
			"color" : "purple",
			'alturas':[4,5,8,3,2]
		 }, 
		 { 
		 	"x_axis": 110, 
			 "y_axis": 100, 
			 "radius": 5, 
			 "color" : "red",
			'alturas':[8,4,1,7,4]
		}]

var alt = []
datos.forEach(d=>d.alturas.forEach(d=>alt.push(d)))
domY2 = [d3.min(alt),d3.max(alt)]

var width = 350,
	height = 250,
	margin = {top:5, left:25, right:15, bottom:20};

var div = d3.select('body')
	.append('div')


var svg1 = div
	.append('svg')
	.attr('class','svg1')
	.attr('width',width)
	.attr('height',height)


var svg2 = div
	.append('svg')
	.attr('class','svg2')
	.attr('width',width)
	.attr('height',height)

var escalaX = d3.scaleLinear()
	.domain([0,d3.max(datos,d=>d.x_axis)])
	.range([margin.left,width-margin.right])

var escalaY = d3.scaleLinear()
	.domain([0,d3.max(datos,d=>d.y_axis)])
	.range([height-margin.bottom,margin.top])

var escalaX2 = d3.scaleBand()
	.domain(['1','2','3','4','5'])
	.range([margin.left,width-margin.right])	

var escalaY2 = d3.scaleLinear()
	.domain([0,d3.max(alt)])
	.range([height-margin.bottom,margin.top])

var ejeX = d3.axisBottom(escalaX)
var ejeY = d3.axisLeft(escalaY)
var ejeX2 = d3.axisBottom(escalaX2)
var ejeY2 = d3.axisLeft(escalaY2)


svg1
	.append('g')
	.attr('transform','translate(0,'+escalaY.range()[0]+')')
	.call(ejeX)

svg1
	.append('g')
	.attr('transform','translate('+escalaX.range()[0]+',0)')
	.call(ejeY)

svg1
	.append('g')
	.selectAll('circle')
	.data(datos).enter()
	.append('circle')
	.attr('cx',d=>escalaX(d.x_axis))
	.attr('cy',d=>escalaY(d.y_axis))
	.attr('r',d=>d.radius)
	.attr('fill',d=>d.color)
	.on('mouseover',d=>mouseover(d.alturas,d.color))

svg2
	.append('g')
	.attr('transform','translate(0,'+escalaY2.range()[0]+')')
	.call(ejeX2)

svg2
	.append('g')
	.attr('transform','translate('+margin.left+',0)')
	.call(ejeY2)


function mouseover(d,e) {

	var join = svg2
		.selectAll('rect')
		.data(d)
	join
		.transition()
		.duration(1500)
		.attr('y',d=>escalaY2(d))
		.attr('height',d=>escalaY2.range()[0]-escalaY2(d))
		.attr('fill',e)
	join
		.enter()
		.append('rect')
		.attr('x',(d,i)=>escalaX2(i+1)+3)
		.attr('width',escalaX2.bandwidth()-6)
		.attr('y',d=>escalaY2.range()[0])
		.transition()
		.duration(1500)
		.attr('y',d=>escalaY2(d))
		.attr('height',d=>escalaY2.range()[0]-escalaY2(d))
		.attr('fill',e)
}