/**
 * A/B Testing Calculator - Core Calculations
 * Handles the statistical functions for A/B testing
 */

var ABTestingCore = (function() {
    /**
     * Calculate conversion rate
     */
    function calculateConversionRate(conversions, visitors) {
        if (visitors === 0) return 0;
        return conversions / visitors;
    }
    
    /**
     * Calculate standard error of difference
     */
    function calculateStandardError(rate1, visitors1, rate2, visitors2) {
        const variance1 = rate1 * (1 - rate1) / visitors1;
        const variance2 = rate2 * (1 - rate2) / visitors2;
        return Math.sqrt(variance1 + variance2);
    }
    
    /**
     * Calculate Z-score
     */
    function calculateZScore(rate1, visitors1, rate2, visitors2) {
        const diff = rate2 - rate1;
        const se = calculateStandardError(rate1, visitors1, rate2, visitors2);
        if (se === 0) return 0;
        return diff / se;
    }
    
    /**
     * Get P-value from Z-score
     */
    function getPValue(zScore) {
        // Approximate the CDF of normal distribution
        const p = 0.5 * (1 + erf(zScore / Math.sqrt(2)));
        return 1 - p;
    }
    
    /**
     * Error function approximation for normal distribution CDF
     */
    function erf(x) {
        // Constants
        const a1 =  0.254829592;
        const a2 = -0.284496736;
        const a3 =  1.421413741;
        const a4 = -1.453152027;
        const a5 =  1.061405429;
        const p  =  0.3275911;
        
        // Save the sign
        const sign = (x < 0) ? -1 : 1;
        x = Math.abs(x);
        
        // Formula
        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        
        return sign * y;
    }
    
    /**
     * Calculate relative improvement
     */
    function calculateImprovement(rate1, rate2) {
        if (rate1 === 0) return 0;
        return (rate2 - rate1) / rate1;
    }
    
    /**
     * Calculate confidence interval
     */
    function calculateConfidenceInterval(rate1, visitors1, rate2, visitors2, zCritical) {
        const diff = rate2 - rate1;
        const se = calculateStandardError(rate1, visitors1, rate2, visitors2);
        const marginOfError = zCritical * se;
        
        return {
            lower: diff - marginOfError,
            upper: diff + marginOfError
        };
    }
    
    /**
     * Get Z critical value for confidence level
     */
    function getZCritical(confidenceLevel) {
        // Common z-critical values
        const zValues = {
            '80': 1.28,
            '85': 1.44,
            '90': 1.65,
            '95': 1.96,
            '99': 2.58
        };
        
        return zValues[confidenceLevel] || 1.96; // Default to 95% if not found
    }
    
    /**
     * Check if result is statistically significant
     */
    function isSignificant(pValue, confidenceLevel) {
        const alpha = 1 - (confidenceLevel / 100);
        return pValue < alpha;
    }
    
    /**
     * Calculate potential impact
     */
    function calculatePotentialImpact(conversionDiff, visitors) {
        return conversionDiff * visitors;
    }
    
    /**
     * Generate interpretation text
     */
    function generateInterpretation(isSignificant, improvement, confidenceLevel, sampleSize, pValue) {
        let interpretation = '';
        
        if (isSignificant) {
            interpretation = `Your test results are statistically significant at the ${confidenceLevel}% confidence level (p-value: ${pValue.toFixed(4)}). `;
            
            if (improvement > 0) {
                interpretation += `The variation outperformed the control by approximately ${(improvement * 100).toFixed(2)}%. `;
            } else {
                interpretation += `The control outperformed the variation by approximately ${(Math.abs(improvement) * 100).toFixed(2)}%. `;
            }
        } else {
            interpretation = `Your test results are NOT statistically significant at the ${confidenceLevel}% confidence level (p-value: ${pValue.toFixed(4)}). `;
            interpretation += `This means we cannot confidently determine whether the observed difference of ${(improvement * 100).toFixed(2)}% is real or due to random chance. `;
        }
        
        // Add sample size commentary
        if (sampleSize < 1000) {
            interpretation += `Note: Your sample size is relatively small (${sampleSize} total visitors), which may limit the reliability of these results.`;
        }
        
        return interpretation;
    }
    
    /**
     * Generate recommendations
     */
    function generateRecommendations(isSignificant, improvement, sampleSize) {
        let recommendations = '';
        
        if (isSignificant) {
            if (improvement > 0) {
                recommendations = 'Recommendation: Consider implementing the variation as it shows a statistically significant improvement.';
            } else {
                recommendations = 'Recommendation: Stick with the control or develop a new variation as the tested variation performed worse.';
            }
        } else {
            if (sampleSize < 1000) {
                recommendations = 'Recommendation: Continue the test to collect more data. The current sample size may not be large enough to detect a meaningful difference.';
            } else {
                recommendations = 'Recommendation: Consider ending the test as there appears to be no meaningful difference between the variations, or redesign the test with more substantial changes.';
            }
        }
        
        return recommendations;
    }
    
    // Public API
    return {
        calculateConversionRate: calculateConversionRate,
        calculateZScore: calculateZScore,
        getPValue: getPValue,
        calculateImprovement: calculateImprovement,
        calculateConfidenceInterval: calculateConfidenceInterval,
        getZCritical: getZCritical,
        isSignificant: isSignificant,
        calculatePotentialImpact: calculatePotentialImpact,
        generateInterpretation: generateInterpretation,
        generateRecommendations: generateRecommendations
    };
})();