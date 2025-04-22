<?php
/**
 * Class that handles all script and style enqueuing
 */
class Price_Elasticity_Assets {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'register_frontend_assets'));
    }
    
    /**
     * Register and enqueue frontend assets
     */
    public function register_frontend_assets() {
        // Only load assets when needed
        if (!$this->should_load_assets()) {
            return;
        }
        
        // Register styles
        wp_register_style(
            'price-elasticity-styles',
            PRICE_ELASTICITY_PLUGIN_URL . 'assets/css/price-elasticity-styles.css',
            array(),
            PRICE_ELASTICITY_VERSION
        );
        
        // Register scripts
        wp_register_script(
            'd3-visualization-library',
            'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js',
            array(),
            '7.8.5',
            true
        );
        
        wp_register_script(
            'price-elasticity-core',
            PRICE_ELASTICITY_PLUGIN_URL . 'assets/js/price-elasticity-core.js',
            array('jquery'),
            PRICE_ELASTICITY_VERSION,
            true
        );
        
        wp_register_script(
            'price-elasticity-charts',
            PRICE_ELASTICITY_PLUGIN_URL . 'assets/js/price-elasticity-charts.js',
            array('jquery', 'd3-visualization-library', 'price-elasticity-core'),
            PRICE_ELASTICITY_VERSION,
            true
        );
        
        wp_register_script(
            'price-elasticity-ui',
            PRICE_ELASTICITY_PLUGIN_URL . 'assets/js/price-elasticity-ui.js',
            array('jquery', 'price-elasticity-core', 'price-elasticity-charts'),
            PRICE_ELASTICITY_VERSION,
            true
        );
        
        // Enqueue everything
        wp_enqueue_style('price-elasticity-styles');
        wp_enqueue_script('d3-visualization-library');
        wp_enqueue_script('price-elasticity-core');
        wp_enqueue_script('price-elasticity-charts');
        wp_enqueue_script('price-elasticity-ui');
    }
    
    /**
     * Determine if assets should be loaded
     */
    private function should_load_assets() {
        global $post;
        
        if (!is_a($post, 'WP_Post')) {
            return false;
        }
        
        return has_shortcode($post->post_content, 'price_elasticity_calculator');
    }
}