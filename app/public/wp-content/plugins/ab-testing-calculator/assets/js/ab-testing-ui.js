// Calculate confidence interval
const ci = ABTestingCore.calculateConfidenceInterval(
    controlRate, 
    controlV, 
    variationRate, 
    variationV, 
    zCritical
);

// Check statistical significance
const significant = ABTestingCore.isSignificant(pValue, confLevel);

// Calculate improvement
const improvement = ABTestingCore.calculateImprovement(controlRate, variationRate);

// Calculate potential impact
const totalVisitors = controlV + variationV;
const averageRate = (controlC + variationC) / totalVisitors;
const improvementRate = variationRate - controlRate;
const potentialImpact = ABTestingCore.calculatePotentialImpact(improvementRate, totalVisitors);

// Generate interpretation and recommendations
const interpretation = ABTestingCore.generateInterpretation(
    significant, 
    improvement, 
    confLevel, 
    totalVisitors, 
    pValue
);

const recommendations = ABTestingCore.generateRecommendations(
    significant, 
    improvement, 
    totalVisitors
);

// Update UI with results
displayResults(
    significant, 
    improvement, 
    ci, 
    potentialImpact, 
    interpretation, 
    recommendations,
    controlRate,
    variationRate
);
}

// Display results in UI
function displayResults(significant, improvement, ci, potentialImpact, interpretation, recommendations, controlRate, variationRate) {
// Update significance indicator
indicatorLight.className = 'indicator-light ' + (significant ? 'significant' : 'not-significant');
indicatorText.textContent = significant ? 'Statistically Significant' : 'Not Statistically Significant';

// Update confidence interval display
confidenceIntervalEl.textContent = `Absolute difference: ${(ci.lower * 100).toFixed(2)}% to ${(ci.upper * 100).toFixed(2)}%`;

// Update improvement display
const improvementPercent = (improvement * 100).toFixed(2);
improvementValue.textContent = `${improvementPercent}%`;
improvementValue.style.color = improvement >= 0 ? '#28a745' : '#dc3545';

// Update potential impact
impactValue.textContent = `${Math.abs(potentialImpact.toFixed(0))} additional ${potentialImpact >= 0 ? 'conversions' : 'lost conversions'} if applied to the same sample size`;

// Update interpretation and recommendations
interpretationText.textContent = interpretation;
recommendationsEl.textContent = recommendations;

// Create visualization
ABTestingCharts.createResultsChart(controlRate, variationRate, ci, 'results-chart');

// Show results section
resultsSection.style.display = 'block';

// Scroll to results
resultsSection.scrollIntoView({ behavior: 'smooth' });
}
});