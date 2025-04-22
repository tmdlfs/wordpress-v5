<?php
/**
 * Class that handles all script and style enqueuing
 */
class AB_Testing_Assets {
    
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
            'ab-testing-styles',
            AB_TESTING_PLUGIN_URL . 'assets/css/ab-testing-styles.css',
            array(),
            AB_TESTING_VERSION
        );
        
        // Register scripts
        wp_register_script(
            'chart-js-library',
            'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
            array(),
            '3.9.1',
            true
        );
        
        wp_register_script(
            'ab-testing-core',
            AB_TESTING_PLUGIN_URL . 'assets/js/ab-testing-core.js',
            array('jquery'),
            AB_TESTING_VERSION,
            true
        );
        
        wp_register_script(
            'ab-testing-charts',
            AB_TESTING_PLUGIN_URL . 'assets/js/ab-testing-charts.js',
            array('jquery', 'chart-js-library', 'ab-testing-core'),
            AB_TESTING_VERSION,
            true
        );
        
        wp_register_script(
            'ab-testing-ui',
            AB_TESTING_PLUGIN_URL . 'assets/js/ab-testing-ui.js',
            array('jquery', 'ab-testing-core', 'ab-testing-charts'),
            AB_TESTING_VERSION,
            true
        );
        
        // Enqueue everything
        wp_enqueue_style('ab-testing-styles');
        wp_enqueue_script('chart-js-library');
        wp_enqueue_script('ab-testing-core');
        wp_enqueue_script('ab-testing-charts');
        wp_enqueue_script('ab-testing-ui');
    }
    
    /**
     * Determine if assets should be loaded
     */
    private function should_load_assets() {
        global $post;
        
        if (!is_a($post, 'WP_Post')) {
            return false;
        }
        
        return has_shortcode($post->post_content, 'ab_testing_calculator');
    }
}