<?php
/**
 * Template for the A/B testing calculator
 */

// Access attributes
$calculator_atts = get_query_var('calculator_atts');
$calculator_title = esc_html($calculator_atts['title']);
$calculator_theme = esc_attr($calculator_atts['theme']);
$confidence_default = intval($calculator_atts['confidence_default']);
if ($confidence_default < 80 || $confidence_default > 99) {
    $confidence_default = 95;
}
?>

<div class="ab-testing-calculator ab-testing-calculator--theme-<?php echo $calculator_theme; ?>" data-confidence-default="<?php echo $confidence_default; ?>">
    <h2><?php echo $calculator_title; ?></h2>
    <p>Calculate the statistical significance of your A/B test results and make data-driven decisions.</p>
    
    <div class="input-section">
        <div class="variants-container">
            <div class="variant-column">
                <h3>Control (A)</h3>
                <div class="input-group">
                    <label for="control-visitors">Visitors:</label>
                    <input type="number" id="control-visitors" min="1" placeholder="e.g., 5000">
                </div>
                <div class="input-group">
                    <label for="control-conversions">Conversions:</label>
                    <input type="number" id="control-conversions" min="0" placeholder="e.g., 150">
                </div>
                <div class="rate-display" id="control-rate">Conversion Rate: -</div>
            </div>
            
            <div class="variant-column">
                <h3>Variation (B)</h3>
                <div class="input-group">
                    <label for="variation-visitors">Visitors:</label>
                    <input type="number" id="variation-visitors" min="1" placeholder="e.g., 5000">
                </div>
                <div class="input-group">
                    <label for="variation-conversions">Conversions:</label>
                    <input type="number" id="variation-conversions" min="0" placeholder="e.g., 180">
                </div>
                <div class="rate-display" id="variation-rate">Conversion Rate: -</div>
            </div>
        </div>
        
        <div class="confidence-section">
            <label for="confidence-level">Confidence Level:</label>
            <select id="confidence-level">
                <option value="80">80%</option>
                <option value="85">85%</option>
                <option value="90">90%</option>
                <option value="95">95%</option>
                <option value="99">99%</option>
            </select>
        </div>
        
        <button id="calculate-btn" class="btn">Calculate Results</button>
        <div class="error-message" id="error-message"></div>
    </div>
    
    <div class="results-section" id="results-section">
        <div class="results-card">
            <h3>Statistical Significance</h3>
            <div class="significance-indicator" id="significance-indicator">
                <div class="indicator-light"></div>
                <div class="indicator-text">Calculating...</div>
            </div>
            <div class="confidence-interval" id="confidence-interval"></div>
        </div>
        
        <div class="results-card">
            <h3>Improvement</h3>
            <div class="improvement-value" id="improvement-value">-</div>
            <div class="potential-impact">
                <p>Potential impact:</p>
                <div id="impact-value">-</div>
            </div>
        </div>
        
        <div class="results-card">
            <h3>Visualization</h3>
            <div class="chart-container">
                <canvas id="results-chart"></canvas>
            </div>
        </div>
        
        <div class="results-card">
            <h3>Interpretation</h3>
            <div class="interpretation-text" id="interpretation-text"></div>
            <div class="recommendations" id="recommendations"></div>
        </div>
    </div>
</div>