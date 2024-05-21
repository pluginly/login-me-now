<?php
/**
 * Plugin Name: Login Me Now
 * Description: 1 click passwordless login, social login & user switching
 * Author: WPtownhall
 * Author URI: https://wptownhall.com/login-me-now/
 * Version: 1.6.0
 * Requires PHP: 7.4
 * License: GPL2
 * Text Domain: login-me-now
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * **********************************************************************
 */

use HeyMehedi\Utils\Config;
use LoginMeNow\App;

// don't call the file directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include __DIR__ . '/vendor/autoload.php';

final class LoginMeNow {
	public object $app;
	private static $instance;

	public static function init(): object {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof LoginMeNow ) ) {
			self::$instance = new LoginMeNow();
			self::$instance->setup();
		}

		return self::$instance;
	}

	private function setup(): void {
		register_activation_hook( __FILE__, [$this, 'auto_deactivate'] );

		if ( ! $this->is_supported_php() ) {
			return;
		}

		$this->define_constants();
		$this->app = new App();

		do_action( 'login_me_now_loaded' );
	}

	public function is_supported_php(): bool {
		if ( version_compare( PHP_VERSION, Config::get( 'min_php' ), '<' ) ) {
			return false;
		}

		return true;
	}

	public function auto_deactivate(): void {
		if ( $this->is_supported_php() ) {
			return;
		}

		deactivate_plugins( basename( __FILE__ ) );

		$error = __( '<h1>An Error Occurred</h1>', 'login-me-now' );
		$error .= __( '<h2>Your installed PHP Version is: ', 'login-me-now' ) . PHP_VERSION . '</h2>';
		$error .= __( '<p>The <strong>Login Me Now</strong> plugin requires PHP version <strong>', 'login-me-now' ) . $this->min_php . __( '</strong> or greater', 'login-me-now' );
		$error .= __( '<p>The version of your PHP is ', 'login-me-now' ) . '<a href="http://php.net/supported-versions.php" target="_blank"><strong>' . __( 'unsupported and old', 'login-me-now' ) . '</strong></a>.';
		$error .= __( 'You should update your PHP software or contact your host regarding this matter.</p>', 'login-me-now' );
		wp_die(
			wp_kses_post( $error ),
			esc_html__( 'Plugin Activation Error', 'login-me-now' ),
			[
				'response'  => 200,
				'back_link' => true,
			]
		);
	}

	private function define_constants(): void {
		define( 'LOGIN_ME_NOW_VERSION', Config::get( 'version' ) );
		define( 'LOGIN_ME_NOW_FILE', __FILE__ );
		define( 'LOGIN_ME_NOW_URL', plugins_url( '', LOGIN_ME_NOW_FILE ) );
		define( 'LOGIN_ME_NOW_PATH', dirname( LOGIN_ME_NOW_FILE ) );
		define( 'LOGIN_ME_NOW_APP_PATH', LOGIN_ME_NOW_PATH . '/app/' );
		define( 'LOGIN_ME_NOW_APP_URL', LOGIN_ME_NOW_URL . '/app/' );

		define( 'LOGIN_ME_NOW_INCLUDES', LOGIN_ME_NOW_APP_PATH . 'Common' );
		define( 'LOGIN_ME_NOW_LOGINS', LOGIN_ME_NOW_APP_PATH . 'Logins' );
		define( 'LOGIN_ME_NOW_ASSETS', LOGIN_ME_NOW_URL . 'assets' );
		define( 'LOGIN_ME_NOW_PUBLIC', LOGIN_ME_NOW_URL . '/public/' );
		define( 'LOGIN_ME_NOW_TEMPLATE_PATH', LOGIN_ME_NOW_PATH . '/templates/' );

		define( 'LOGIN_ME_NOW_ADMIN_URL', LOGIN_ME_NOW_APP_URL . 'Admin' );
		define( 'LOGIN_ME_NOW_ADMIN_PATH', LOGIN_ME_NOW_APP_PATH . 'Admin' );

		define( 'LOGIN_ME_NOW_MENU_SLUG', apply_filters( 'login_me_now_menu_slug', Config::get( 'menu_slug' ) ) );
		define( 'LOGIN_ME_NOW_MENU_CAPABILITY', apply_filters( 'login_me_now_menu_capability', Config::get( 'menu_cap' ) ) );

		define( 'LOGIN_ME_NOW_PRO_UPGRADE_URL', Config::get( 'pro_upgrade_url' ) );
	}
}

/**
 * Init the LoginMeNow plugin
 */
function LoginMeNow() {
	return LoginMeNow::init();
}

// kick it off
LoginMeNow();