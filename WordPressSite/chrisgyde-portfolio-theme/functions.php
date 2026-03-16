<?php
if (!defined('ABSPATH')) {
  exit;
}

function chrisgyde_portfolio_theme_assets() {
  wp_enqueue_style('chrisgyde-portfolio-style', get_stylesheet_uri(), array(), '1.0.0');
  wp_enqueue_script('chrisgyde-portfolio-script', get_template_directory_uri() . '/script.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'chrisgyde_portfolio_theme_assets');

function chrisgyde_portfolio_theme_setup() {
  add_theme_support('title-tag');
}
add_action('after_setup_theme', 'chrisgyde_portfolio_theme_setup');
