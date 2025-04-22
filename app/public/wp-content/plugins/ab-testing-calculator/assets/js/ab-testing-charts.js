/**
 * A/B Testing Calculator - Data Visualizations
 * Uses Chart.js to create result visualizations
 */

var ABTestingCharts = (function() {
    let resultsChart = null;
    
    /**
     * Create or update results chart
     */
    function createResultsChart(controlRate, variationRate, confidenceInterval, canvasId) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        // Calculate for error bars
        const ciRange = {
            controlLower: controlRate,
            controlUpper: controlRate,
            variationLower: Math.max(0, variationRate + confidenceInterval.lower),
            variationUpper: variationRate + confidenceInterval.upper
        };
        
        // Convert to percentages for display
        const displayRates = {
            control: (controlRate * 100).toFixed(2),
            variation: (variationRate * 100).toFixed(2)
        };
        
        const displayCI = {
            lower: (ciRange.variationLower * 100).toFixed(2),
            upper: (ciRange.variationUpper * 100).toFixed(2)
        };
        
        // Destroy existing chart if it exists
        if (resultsChart) {
            resultsChart.destroy();
        }
        
        // Determine colors
        const controlColor = 'rgba(54, 162, 235, 0.8)';
        const variationColor = 'rgba(255, 99, 132, 0.8)';
        
        // Create chart
        resultsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Control (A)', 'Variation (B)'],
                datasets: [{
                    label: 'Conversion Rate (%)',
                    data: [displayRates.control, displayRates.variation],
                    backgroundColor: [controlColor, variationColor],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw + '%';
                                
                                // Add confidence interval info to variation tooltip
                                if (context.dataIndex === 1) {
                                    label += `\nCI: ${displayCI.lower}% - ${displayCI.upper}%`;
                                }
                                
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Conversion Rate (%)'
                        }
                    }
                }
            }
        });
        
        return resultsChart;
    }
    
    // Public API
    return {
        createResultsChart: createResultsChart
    };
})();