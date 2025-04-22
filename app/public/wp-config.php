<?php
// Increase upload limits
@ini_set('upload_max_filesize', '128M');
@ini_set('post_max_size', '128M');
@ini_set('memory_limit', '256M');
@ini_set('max_execution_time', '300');
@ini_set('max_input_time', '300');

/**
 * The base configuration for WordPress
 *
 * This file contains the following configurations:
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - Using environment variables for Railway ** //
define('DB_NAME', getenv('WORDPRESS_DB_NAME') ?: 'railway');
define('DB_USER', getenv('WORDPRESS_DB_USER') ?: 'root');
define('DB_PASSWORD', getenv('WORDPRESS_DB_PASSWORD'));
define('DB_HOST', getenv('WORDPRESS_DB_HOST') ?: 'mysql.railway.internal');

/** Database charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The database collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',          '05sw[Jb`P-DQ,NU7Cucg|<DmeWxT{,0!/T?CkRXu{h/xr~qwH^}:X}ft4O6n,]@k');
define('SECURE_AUTH_KEY',   'M3q. ahY?CsEg.GDWId*_|7 -O3e-GO#`[ojJ_+e?DF36XCo2ccej)H>`-A=5B?7');
define('LOGGED_IN_KEY',     'ej&R;SZo*-u4NN%i#.Q1)!Xr:*$0-H$ ];nnN,x)r}SASGHi{@G|WHa>;*J*pH Q');
define('NONCE_KEY',         'd$j<BOJlF}O>V,BW0eCg$~;w3*KG[0>jD-?0OH?.9M(@9i{Y`P@(8xvO Q@@d&If');
define('AUTH_SALT',         '2>r(8Td;(Y )vwe[z8_l|iw@EA.9TzBF:+Gl{@M.}+$2:q=!#5@|( UV-f-:od`%');
define('SECURE_AUTH_SALT',  '93A@sW+ ](Hqu7u >Z|+<z^s82y30%JQb[,Q79K5M~bP:_3y!S@hTdLRF#{:q{ae');
define('LOGGED_IN_SALT',    '%#]YlXGrs:]rv[2PpMq2DOzXqYpZDn%H-LTs4JW~Dg(Kpu~sTIl<L#;affa Vo{L');
define('NONCE_SALT',        'x=QZNn+UEB}!=+;O0qauaYEm>p5`DTYDd)~Fcq[@l8k@jd%gtp<^fT*@jZR-7f5,');
define('WP_CACHE_KEY_SALT', 'Rd#S1H{;33Ia19sC#jEL{qUrV>#h`ir/BHfhmKGr`l!.dWr-z*8L,{%kO{2wvB`t');
/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/* Add any custom values between this line and the "stop editing" line. */

// Set up HTTPS behind proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if (!defined('WP_DEBUG')) {
    define('WP_DEBUG', false);
}

// Define environment type for Railway
define('WP_ENVIRONMENT_TYPE', 'production');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';