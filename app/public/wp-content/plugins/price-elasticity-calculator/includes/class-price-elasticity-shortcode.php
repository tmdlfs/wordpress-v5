<?php
/**
 * Class that handles the shortcode functionality
 */
class Price_Elasticity_Shortcode {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_shortcode('price_elasticity_calculator', array($this, 'render_calculator'));
    }
    
    /**
     * Render the calculator from template
     */
    public function render_calculator($atts) {
        // Parse attributes
        $atts = shortcode_atts(
            array(
                'title' => 'Price Elasticity Calculator',
                'theme' => 'light',
                'currency' => '$'
            ),
            $atts,
            'price_elasticity_calculator'
        );
        
        // Set template variables
        set_query_var('calculator_atts', $atts);
        
        // Start output buffering
        ob_start();
        
        // Include template
        include PRICE_ELASTICITY_PLUGIN_DIR . 'templates/calculator-template.php';
        
        // Return the buffered content
        return ob_get_clean();
    }
}