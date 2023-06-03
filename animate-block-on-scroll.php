<?php
/**
 * Plugin Name:       Animate Block On Scroll
 * Description:       Animate any Gutenberg block on scroll
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Chris Gander
 * Text Domain:       animate-block-on-scroll
 * Licence:           MIT License
 *
 * @package           create-block
 */

 if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

 if ( ! defined( 'ANIMATE_BLOCK_ON_SCROLL_PATH' ) ) {
	 define( 'ANIMATE_BLOCK_ON_SCROLL_PATH', plugin_dir_path( __FILE__ ) );
 }
 if ( ! defined( 'ANIMATE_BLOCK_ON_SCROLL_URL' ) ) {
	 define( 'ANIMATE_BLOCK_ON_SCROLL_URL', plugin_dir_url( __FILE__ ) );
 }

function create_block_animate_block_on_scroll_block_init() {
	wp_register_script(
        'animate-block-on-scroll',
        ANIMATE_BLOCK_ON_SCROLL_URL . 'build/index.js',
        [ 'wp-blocks', 'wp-dom', 'wp-dom-ready', 'wp-edit-post' ],
        filemtime( ANIMATE_BLOCK_ON_SCROLL_PATH . 'build/index.js' )
    );
    wp_enqueue_script( 'animate-block-on-scroll' );
}
add_action( 'enqueue_block_editor_assets', 'create_block_animate_block_on_scroll_block_init' );

function enqueue_styles() {
	wp_register_style( 'aos-css', 'https://unpkg.com/aos@2.3.1/dist/aos.css' );
	wp_enqueue_style('aos-css');
	wp_register_script( 'aos-js', 'https://unpkg.com/aos@2.3.1/dist/aos.js' );
	wp_enqueue_script('aos-js');
	wp_register_script(
        'animate-block-on-scroll-frontend',
        ANIMATE_BLOCK_ON_SCROLL_URL . 'build/frontend.js',
        [ 'jquery', 'aos-js' ],
        filemtime( ANIMATE_BLOCK_ON_SCROLL_PATH . 'build/frontend.js' )
    );
    wp_enqueue_script( 'animate-block-on-scroll-frontend' );
}

add_action( 'wp_enqueue_scripts',  'enqueue_styles');