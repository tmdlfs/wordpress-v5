<?php
/**
 * Plugin Name: A/B Testing Calculator
 * Description: Statistical significance calculator for A/B test results
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: ab-testing-calculator
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('AB_TESTING_VERSION', '1.0.0');
define('AB_TESTING_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('AB_TESTING_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once AB_TESTING_PLUGIN_DIR . 'includes/class-ab-testing-shortcode.php';
require_once AB_TESTING_PLUGIN_DIR . 'includes/class-ab-testing-assets.php';

// Initialize the plugin components
function ab_testing_init() {
    // Load text domain for translations
    load_plugin_textdomain('ab-testing-calculator', false, dirname(plugin_basename(__FILE__)) . '/languages');
    
    // Initialize classes
    new AB_Testing_Assets();
    new AB_Testing_Shortcode();
}
add_action('plugins_loaded', 'ab_testing_init');