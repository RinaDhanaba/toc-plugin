<?php
/*
Plugin Name: Table of Contents Plugin
Description: A plugin to dynamically generate a Table of Contents (TOC) with shortcode and admin settings.
Version: 1.0
Author: Rina Dhanaba
*/

// Register the shortcode
function toc_shortcode() {
    ob_start();
    ?>
    <div class="toc"></div>

    <?php
    return ob_get_clean();
}
add_shortcode('toc', 'toc_shortcode');


// Enqueue the CSS and JavaScript
function toc_enqueue_scripts() {
    // Enqueue your CSS
    wp_enqueue_style('toc-style', plugins_url('toc-style.css', __FILE__));

    // Enqueue your JS with the dynamic class passed as a localized variable
    
    wp_enqueue_script('toc-script', plugins_url('toc-script.js', __FILE__), array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'toc_enqueue_scripts');