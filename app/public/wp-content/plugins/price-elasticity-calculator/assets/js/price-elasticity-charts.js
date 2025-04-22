/**
 * Price Elasticity Calculator - Data Visualizations
 * Uses D3.js to create demand and revenue charts
 */

var PriceElasticityCharts = (function() {
    /**
     * Create demand curve visualization
     */
    function createDemandCurve(dataPoints, chartElementId, tooltipElementId) {
        const demandChart = document.getElementById(chartElementId);
        const tooltip = document.getElementById(tooltipElementId);
        demandChart.innerHTML = '';
        
        const margin = { top: 20, right: 30, bottom: 40, left: 60 };
        const width = demandChart.clientWidth - margin.left - margin.right;
        const height = demandChart.clientHeight - margin.top - margin.bottom;
        
        // Create SVG
        const svg = d3.select('#' + chartElementId)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(dataPoints, d => d.quantity) * 1.1])
            .range([0, width]);
        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataPoints, d => d.price) * 1.1])
            .range([height, 0]);
        
        // Create axes
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .append('text')
            .attr('x', width / 2)
            .attr('y', 35)
            .attr('fill', '#333')
            .attr('text-anchor', 'middle')
            .text('Quantity');
        
        svg.append('g')
            .call(d3.axisLeft(yScale))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -45)
            .attr('x', -height / 2)
            .attr('fill', '#333')
            .attr('text-anchor', 'middle')
            .text('Price');
        
        // Create a line generator
        const line = d3.line()
            .x(d => xScale(d.quantity))
            .y(d => yScale(d.price))
            .curve(d3.curveMonotoneX);
        
        // Draw the line
        svg.append('path')
            .datum(dataPoints)
            .attr('fill', 'none')
            .attr('stroke', '#0073aa')
            .attr('stroke-width', 2)
            .attr('d', line);
        
        // Add data points
        svg.selectAll('.data-point')
            .data(dataPoints)
            .enter()
            .append('circle')
            .attr('class', 'data-point')
            .attr('cx', d => xScale(d.quantity))
            .attr('cy', d => yScale(d.price))
            .attr('r', 5)
            .attr('fill', '#0073aa')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('r', 7);
                tooltip.style.display = 'block';
                tooltip.innerHTML = `Price: $${d.price.toFixed(2)}<br>Quantity: ${d.quantity}`;
                tooltip.style.left = (event.pageX + 10) + 'px';
                tooltip.style.top = (event.pageY - 30) + 'px';
            })
            .on('mouseout', function() {
                d3.select(this).attr('r', 5);
                tooltip.style.display = 'none';
            });
        
        // Add label
        svg.append('text')
            .attr('class', 'curve-label')
            .attr('x', width / 2)
            .attr('y', 10)
            .attr('text-anchor', 'middle')
            .text('Demand Curve');
    }
    
    /**
     * Create revenue curve visualization
     */
    function createRevenueCurve(revenueData, chartElementId, tooltipElementId) {
        const revenueChart = document.getElementById(chartElementId);
        const tooltip = document.getElementById(tooltipElementId);
        revenueChart.innerHTML = '';
        
        const margin = { top: 20, right: 30, bottom: 40, left: 60 };
        const width = revenueChart.clientWidth - margin.left - margin.right;
        const height = revenueChart.clientHeight - margin.top - margin.bottom;
        
        // Create SVG
        const svg = d3.select('#' + chartElementId)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        // Sort data by price for proper line
        revenueData.sort((a, b) => a.price - b.price);
        
        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(revenueData, d => d.price) * 1.1])
            .range([0, width]);
        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(revenueData, d => d.revenue) * 1.1])
            .range([height, 0]);
        
        // Create axes
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .append('text')
            .attr('x', width / 2)
            .attr('y', 35)
            .attr('fill', '#333')
            .attr('text-anchor', 'middle')
            .text('Price');
        
        svg.append('g')
            .call(d3.axisLeft(yScale))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -45)
            .attr('x', -height / 2)
            .attr('fill', '#333')
            .attr('text-anchor', 'middle')
            .text('Revenue');
        
        // Create a line generator
        const line = d3.line()
            .x(d => xScale(d.price))
            .y(d => yScale(d.revenue))
            .curve(d3.curveMonotoneX);
        
        // Draw the line
        svg.append('path')
            .datum(revenueData)
            .attr('fill', 'none')
            .attr('stroke', '#28a745')
            .attr('stroke-width', 2)
            .attr('d', line);
        
        // Add data points
        svg.selectAll('.revenue-point')
            .data(revenueData)
            .enter()
            .append('circle')
            .attr('class', 'data-point')
            .attr('cx', d => xScale(d.price))
            .attr('cy', d => yScale(d.revenue))
            .attr('r', 5)
            .attr('fill', '#28a745')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('r', 7);
                tooltip.style.display = 'block';
                tooltip.innerHTML = `Price: $${d.price.toFixed(2)}<br>Revenue: $${d.revenue.toFixed(2)}`;
                tooltip.style.left = (event.pageX + 10) + 'px';
                tooltip.style.top = (event.pageY - 30) + 'px';
            })
            .on('mouseout', function() {
                d3.select(this).attr('r', 5);
                tooltip.style.display = 'none';
            });
        
        // Highlight optimal price point
        const optimalPoint = revenueData.reduce((max, point) => 
            point.revenue > max.revenue ? point : max, revenueData[0]);
        
        svg.append('circle')
            .attr('cx', xScale(optimalPoint.price))
            .attr('cy', yScale(optimalPoint.revenue))
            .attr('r', 8)
            .attr('fill', 'none')
            .attr('stroke', '#dc3545')
            .attr('stroke-width', 2);
        
        // Add label
        svg.append('text')
            .attr('class', 'curve-label')
            .attr('x', width / 2)
            .attr('y', 10)
            .attr('text-anchor', 'middle')
            .text('Revenue Optimisation Curve');
    }
    
    // Public API
    return {
        createDemandCurve: createDemandCurve,
        createRevenueCurve: createRevenueCurve
    };
})();