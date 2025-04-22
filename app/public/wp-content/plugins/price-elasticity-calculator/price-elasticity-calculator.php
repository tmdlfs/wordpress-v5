<?php
/**
 * Plugin Name: Price Elasticity of Demand Calculator
 * Description: Interactive tool that measures how responsive the quantity demanded is to price changes
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: price-elasticity-calculator
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('PRICE_ELASTICITY_VERSION', '1.0.0');
define('PRICE_ELASTICITY_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('PRICE_ELASTICITY_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once PRICE_ELASTICITY_PLUGIN_DIR . 'includes/class-price-elasticity-shortcode.php';
require_once PRICE_ELASTICITY_PLUGIN_DIR . 'includes/class-price-elasticity-assets.php';

// Initialize the plugin components
function price_elasticity_init() {
    // Load text domain for translations
    load_plugin_textdomain('price-elasticity-calculator', false, dirname(plugin_basename(__FILE__)) . '/languages');
    
    // Initialize classes
    new Price_Elasticity_Assets();
    new Price_Elasticity_Shortcode();
}
add_action('plugins_loaded', 'price_elasticity_init');