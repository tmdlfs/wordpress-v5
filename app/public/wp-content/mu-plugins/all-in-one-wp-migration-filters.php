<?php
/**
 * Plugin Name: All-in-One WP Migration Custom Filters
 * Description: Increases upload size limit for All-in-One WP Migration plugin
 */

// Increase maximum upload file size for All-in-One WP Migration
add_filter('upload_size_limit', function($size) {
    return 268435456; // 256 MB in bytes
});

// Disable upload time limit
add_filter('ai1wm_max_execution_time', function() {
    return 0;
});

// Increase file size limit specifically for All-in-One WP Migration
if (!defined('AI1WM_MAX_FILE_SIZE')) {
    define('AI1WM_MAX_FILE_SIZE', 268435456); // 256 MB in bytes
}

// Increase storage size limit
if (!defined('AI1WM_MAX_STORAGE_DISK_SIZE')) {
    define('AI1WM_MAX_STORAGE_DISK_SIZE', 536870912); // 512 MB in bytes
}