const data = [
  { name: 'George', score: 23},
  { name: 'Ellie', score: 5},
  { name: 'Kasey', score: 87},
  { name: 'Charlie', score: 78},
  { name: 'Jenny', score: 43},
  { name: 'Robo Cop', score: 100},
]

const width = 800;
const height = 400;
const margin = {top: 50, bottom: 50, left: 50, right: 50}

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('height', height - margin.top - margin.bottom)
  .attr('width', width - margin.left - margin.right)
  .attr('viewBox', [0,0, width, height])

  const x = d3.scaleBand() 
    .domain(d3.range(data.length)) 
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3.scaleLinear() 
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]) 


  //creating the bars  
  svg
    .append('g') 
    .attr('fill', 'royalblue')
    .selectAll('rect') 
    .data(data.sort((a, b) => d3.descending(a.score, b.score))) 
    .join('rect')
      .attr('x', (d, i) => x(i)) 
      .attr('y', d => y(d.score))
      .attr('title', (d) => d.score)
      .attr('class', 'rect')
      .attr('height', d => y(0) - y(d.score))
      .attr('width', x.bandwidth()) 
      .attr('class', 'bar');

    function xAxis(g) {
      g.call(d3.axisBottom(x).tickFormat(i => data[i].name)) 
      g.attr('transform', `translate(0, ${height - margin.bottom})`) 
      g.attr('font-size', '20px')
    }

    function yAxis(g) {
      g.call(d3.axisLeft(y).ticks(null, data.format)) 
        .attr("transform", `translate(${margin.left}, 0)`)
        .attr("font-size", '20px')
    }

    svg.node()
    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)
