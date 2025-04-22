/**
 * Price Elasticity Calculator - Core Calculations
 * Handles the mathematical functions for elasticity calculations
 */

var PriceElasticityCore = (function() {
    /**
     * Calculate elasticity between two price-quantity points
     */
    function calculatePointElasticity(p1, q1, p2, q2) {
        // Skip if prices or quantities are the same
        if (p1 === p2 || q1 === q2) {
            return null;
        }
        
        // Calculate percentage changes using arc method
        const avgPrice = (p1 + p2) / 2;
        const avgQuantity = (q1 + q2) / 2;
        
        const percentPriceChange = (p2 - p1) / avgPrice;
        const percentQuantityChange = (q2 - q1) / avgQuantity;
        
        // Calculate arc elasticity
        return percentQuantityChange / percentPriceChange;
    }
    
    /**
     * Calculate average elasticity across multiple points
     */
    function calculateAverageElasticity(dataPoints) {
        let elasticities = [];
        
        // Sort data by price
        dataPoints.sort((a, b) => a.price - b.price);
        
        // Calculate elasticity between each pair of points
        for (let i = 1; i < dataPoints.length; i++) {
            const p1 = dataPoints[i-1].price;
            const p2 = dataPoints[i].price;
            const q1 = dataPoints[i-1].quantity;
            const q2 = dataPoints[i].quantity;
            
            const pointElasticity = calculatePointElasticity(p1, q1, p2, q2);
            if (pointElasticity !== null) {
                elasticities.push(pointElasticity);
            }
        }
        
        // Calculate average elasticity
        if (elasticities.length === 0) {
            return {
                pointElasticities: [],
                averageElasticity: 0
            };
        }
        
        const averageElasticity = elasticities.reduce((sum, val) => sum + val, 0) / elasticities.length;
        
        return {
            pointElasticities: elasticities,
            averageElasticity: averageElasticity
        };
    }
    
    /**
     * Find optimal price point for revenue
     */
    function findOptimalPrice(dataPoints) {
        // Calculate revenue for each point
        const revenueData = dataPoints.map(point => {
            return {
                price: point.price,
                quantity: point.quantity,
                revenue: point.price * point.quantity
            };
        });
        
        // Sort by revenue to find optimal price
        revenueData.sort((a, b) => b.revenue - a.revenue);
        
        return revenueData;
    }
    
    /**
     * Get elasticity interpretation
     */
    function getElasticityInterpretation(elasticity) {
        const absElasticity = Math.abs(elasticity);
        
        if (absElasticity < 1) {
            return {
                type: 'inelastic',
                text: 'Inelastic Demand: Quantity demanded is relatively unresponsive to price changes.',
                recommendation: 'With inelastic demand, you may be able to increase prices further to maximise revenue, as quantity demanded is less responsive to price changes.'
            };
        } else if (absElasticity > 1) {
            return {
                type: 'elastic',
                text: 'Elastic Demand: Quantity demanded is highly responsive to price changes.',
                recommendation: 'With elastic demand, consider lowering prices to potentially increase revenue, as quantity demanded is highly responsive to price changes.'
            };
        } else {
            return {
                type: 'unit',
                text: 'Unit Elastic: Percentage change in quantity equals percentage change in price.',
                recommendation: 'At unit elasticity, your current pricing is balanced for revenue optimisation.'
            };
        }
    }
    
    // Public API
    return {
        calculatePointElasticity: calculatePointElasticity,
        calculateElasticity: calculateAverageElasticity,
        findOptimalPrice: findOptimalPrice,
        getElasticityInterpretation: getElasticityInterpretation
    };
})();