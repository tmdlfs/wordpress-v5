/**
 * Price Elasticity Calculator - User Interface
 * Manages UI interactions and form handling
 */

jQuery(document).ready(function($) {
    // UI element references
    const addRowBtn = document.getElementById('add-row-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const dataInputs = document.getElementById('data-inputs');
    const resultsSection = document.getElementById('results-section');
    const elasticityValue = document.getElementById('elasticity-value');
    const elasticityInterpretation = document.getElementById('elasticity-interpretation');
    const errorMessage = document.getElementById('error-message');
    const optimalPrice = document.getElementById('optimal-price');
    const revenueRecommendation = document.getElementById('revenue-recommendation');
    const tooltip = document.getElementById('tooltip');
    
    let rowCount = 3;
    
    // Get currency symbol from container
    const currencySymbol = $('.elasticity-calculator').data('currency') || '$';
    
    // Add row button click handler
    addRowBtn.addEventListener('click', function() {
        rowCount++;
        
        const priceRow = document.createElement('div');
        priceRow.className = 'input-row';
        priceRow.innerHTML = `
            <label>Price ${rowCount}:</label>
            <input type="number" class="price-input" placeholder="Price" min="0" step="0.01">
            <button class="btn btn-remove remove-row-btn">×</button>
        `;
        
        const quantityRow = document.createElement('div');
        quantityRow.className = 'input-row';
        quantityRow.innerHTML = `
            <label>Units ${rowCount}:</label>
            <input type="number" class="quantity-input" placeholder="Quantity sold" min="0">
        `;
        
        dataInputs.appendChild(priceRow);
        dataInputs.appendChild(quantityRow);
        
        // Add event listener to remove button
        const removeBtn = priceRow.querySelector('.remove-row-btn');
        removeBtn.addEventListener('click', function() {
            dataInputs.removeChild(priceRow);
            dataInputs.removeChild(quantityRow);
        });
    });
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        const priceInputs = document.querySelectorAll('.price-input');
        const quantityInputs = document.querySelectorAll('.quantity-input');
        
        // Validate inputs
        let dataPoints = [];
        
        for (let i = 0; i < priceInputs.length; i++) {
            const price = parseFloat(priceInputs[i].value);
            const quantity = parseFloat(quantityInputs[i].value);
            
            if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity < 0) {
                continue; // Skip invalid data points
            }
            
            dataPoints.push({ price, quantity });
        }
        
        // Sort data points by price
        dataPoints.sort((a, b) => a.price - b.price);
        
        if (dataPoints.length < 3) {
            errorMessage.textContent = 'Please enter at least three valid price and quantity pairs.';
            errorMessage.style.display = 'block';
            resultsSection.style.display = 'none';
            return;
        }
        
        errorMessage.style.display = 'none';
        
        // Calculate elasticity
        const elasticityResults = PriceElasticityCore.calculateElasticity(dataPoints);
        const avgElasticity = elasticityResults.averageElasticity;
        
        elasticityValue.textContent = avgElasticity.toFixed(2);
        
        // Interpret elasticity
        const interpretation = PriceElasticityCore.getElasticityInterpretation(avgElasticity);
        
        elasticityInterpretation.textContent = interpretation.text;
        
        // Set interpretation styling
        if (interpretation.type === 'inelastic') {
            elasticityInterpretation.style.backgroundColor = '#e2f2ff';
            elasticityInterpretation.style.color = '#0073aa';
        } else if (interpretation.type === 'elastic') {
            elasticityInterpretation.style.backgroundColor = '#ffe2e2';
            elasticityInterpretation.style.color = '#dc3545';
        } else {
            elasticityInterpretation.style.backgroundColor = '#e2ffe2';
            elasticityInterpretation.style.color = '#28a745';
        }
        
        // Calculate revenue data
        const revenueData = PriceElasticityCore.findOptimalPrice(dataPoints);
        const optimalPricePoint = revenueData[0];
        
        optimalPrice.textContent = `${currencySymbol}${optimalPricePoint.price.toFixed(2)}`;
        revenueRecommendation.textContent = interpretation.recommendation;
        
        // Display results
        resultsSection.style.display = 'block';
        
        // Create visualizations
        PriceElasticityCharts.createDemandCurve(dataPoints, 'demand-chart', 'tooltip');
        PriceElasticityCharts.createRevenueCurve(revenueData, 'revenue-chart', 'tooltip');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (resultsSection.style.display === 'block') {
            const priceInputs = document.querySelectorAll('.price-input');
            const quantityInputs = document.querySelectorAll('.quantity-input');
            
            let dataPoints = [];
            
            for (let i = 0; i < priceInputs.length; i++) {
                const price = parseFloat(priceInputs[i].value);
                const quantity = parseFloat(quantityInputs[i].value);
                
                if (!isNaN(price) && !isNaN(quantity) && price > 0 && quantity >= 0) {
                    dataPoints.push({ price, quantity });
                }
            }
            
            if (dataPoints.length >= 3) {
                dataPoints.sort((a, b) => a.price - b.price);
                const revenueData = PriceElasticityCore.findOptimalPrice(dataPoints);
                
                PriceElasticityCharts.createDemandCurve(dataPoints, 'demand-chart', 'tooltip');
                PriceElasticityCharts.createRevenueCurve(revenueData, 'revenue-chart', 'tooltip');
            }
        }
    });
});