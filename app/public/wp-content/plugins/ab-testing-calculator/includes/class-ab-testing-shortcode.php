<?php
/**
 * Class that handles the shortcode functionality
 */
class AB_Testing_Shortcode {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_shortcode('ab_testing_calculator', array($this, 'render_calculator'));
    }
    
    /**
     * Render the calculator from template
     */
    public function render_calculator($atts) {
        // Parse attributes
        $atts = shortcode_atts(
            array(
                'title' => 'A/B Testing Calculator',
                'theme' => 'light',
                'confidence_default' => '95'
            ),
            $atts,
            'ab_testing_calculator'
        );
        
        // Set template variables
        set_query_var('calculator_atts', $atts);
        
        // Start output buffering
        ob_start();
        
        // Include template
        include AB_TESTING_PLUGIN_DIR . 'templates/calculator-template.php';
        
        // Return the buffered content
        return ob_get_clean();
    }
}