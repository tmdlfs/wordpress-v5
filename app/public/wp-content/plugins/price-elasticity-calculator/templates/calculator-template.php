<?php
/**
 * Template for the price elasticity calculator
 */

// Access attributes
$calculator_atts = get_query_var('calculator_atts');
$calculator_title = esc_html($calculator_atts['title']);
$calculator_theme = esc_attr($calculator_atts['theme']);
$currency_symbol = esc_attr($calculator_atts['currency']);
?>

<div class="elasticity-calculator elasticity-calculator--theme-<?php echo $calculator_theme; ?>" data-currency="<?php echo $currency_symbol; ?>">
    <h2><?php echo $calculator_title; ?></h2>
    <p>Calculate how responsive the quantity demanded is to changes in price. Enter at least three price points and their corresponding unit sales.</p>
    
    <div class="input-section">
        <div class="data-inputs" id="data-inputs">
            <div class="input-row">
                <label>Price 1:</label>
                <input type="number" class="price-input" placeholder="Price" min="0" step="0.01">
            </div>
            <div class="input-row">
                <label>Units 1:</label>
                <input type="number" class="quantity-input" placeholder="Quantity sold" min="0">
            </div>
            <div class="input-row">
                <label>Price 2:</label>
                <input type="number" class="price-input" placeholder="Price" min="0" step="0.01">
            </div>
            <div class="input-row">
                <label>Units 2:</label>
                <input type="number" class="quantity-input" placeholder="Quantity sold" min="0">
            </div>
            <div class="input-row">
                <label>Price 3:</label>
                <input type="number" class="price-input" placeholder="Price" min="0" step="0.01">
            </div>
            <div class="input-row">
                <label>Units 3:</label>
                <input type="number" class="quantity-input" placeholder="Quantity sold" min="0">
            </div>
        </div>
        
        <button id="add-row-btn" class="btn btn-secondary">Add More Data Points</button>
        <button id="calculate-btn" class="btn">Calculate Elasticity</button>
        
        <div class="error-message" id="error-message"></div>
    </div>
    
    <div class="results-section" id="results-section">
        <div class="results-card">
            <h3>Price Elasticity of Demand</h3>
            <div class="results-value" id="elasticity-value">-</div>
            <div class="elasticity-interpretation" id="elasticity-interpretation"></div>
            <p>The price elasticity indicates how responsive quantity demanded is to changes in price.</p>
        </div>
        
        <div class="results-card">
            <h3>Demand Curve Visualisation</h3>
            <div class="chart-container" id="demand-chart"></div>
        </div>
        
        <div class="results-card">
            <h3>Revenue Optimisation</h3>
            <div class="chart-container" id="revenue-chart"></div>
            <p>Based on the data, the revenue-optimal price point is approximately <span class="optimal-price" id="optimal-price">-</span>.</p>
            <p id="revenue-recommendation"></p>
        </div>
    </div>
    
    <div class="tooltip" id="tooltip"></div>
</div>