<?php
/**
 * @author  WPtownhall
 * @since  	1.0.0
 * @version 1.5.0
 */

namespace LoginMeNow\GoogleLogin;

use Google_Client;
use LoginMeNow\Abstracts\AuthenticateBase;
use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Authenticate extends AuthenticateBase {
	use Hookable;
	use Singleton;

	public string $channel       = 'google';
	public bool $redirect_return = true;

	public function __construct() {
		$this->action( 'init', 'listen' );
	}

	public function listen(): void {
		if ( ! array_key_exists( 'lmn-google', $_GET ) ) {
			return;
		}

		if ( array_key_exists( 'g_csrf_token', $_POST ) ) {
			$this->listen_onetap();
		}

		if ( array_key_exists( 'code', $_GET ) ) {
			$this->listen_button();
		}
	}

	public function listen_button(): void {
		$client_id     = Settings::init()->get( 'google_client_id' );
		$client_secret = Settings::init()->get( 'google_client_secret' );
		$redirect_uri  = home_url( 'wp-login.php?lmn-google' );

		$client = new Google_Client(
			[
				'client_id'     => esc_html( $client_id ),
				'client_secret' => esc_html( $client_secret ),
				'redirect_uri'  => $redirect_uri,
			]
		);

		$tokens   = $client->fetchAccessTokenWithAuthCode( $_GET['code'] );
		$id_token = $tokens['id_token'] ?? '';

		if ( ! $id_token || is_wp_error( $id_token ) ) {
			error_log( 'Login Me Now (! $id_token || is_wp_error( $id_token )- ' . print_r( $id_token, true ) );

			return;
		}

		$data = $client->verifyIdToken( $id_token );

		if ( ! $data || is_wp_error( $data ) ) {
			error_log( 'Login Me Now ( ! $data || is_wp_error( $data ) )- ' . print_r( $data, true ) );

			return;
		}

		$this->_auth( $data );
	}

	public function listen_onetap(): void {
		$nonce = ! empty( $_POST['wpnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['wpnonce'] ) ) : '';

		if ( ! wp_verify_nonce( $nonce, 'lmn-google-nonce' ) ) {
			error_log( 'Login Me Now - WP Nonce Verify Failed' );

			return;
		}

		if ( ! isset( $_POST['g_csrf_token'] ) && ! empty( $_POST['g_csrf_token'] ) ) {
			error_log( 'Login Me Now - Post g_csrf_token not available' );

			return;
		}

		if ( ! isset( $_COOKIE['g_csrf_token'] ) && ! empty( $_COOKIE['g_csrf_token'] ) ) {
			error_log( 'Login Me Now - Cookie g_csrf_token not available' );

			return;
		}

		if ( $_POST['g_csrf_token'] !== $_COOKIE['g_csrf_token'] ) {
			error_log( 'Login Me Now - g_csrf_token is not same in post and cookie' );

			return;
		}

		if ( ! isset( $_POST['credential'] ) && ! empty( $_POST['credential'] ) ) {
			error_log( 'Login Me Now - Credential is not available' );

			return;
		}

		$id_token  = sanitize_text_field( wp_unslash( $_POST['credential'] ) );
		$client_id = Settings::init()->get( 'google_client_id' );
		$client    = new Google_Client( ['client_id' => esc_html( $client_id )] );
		$data      = $client->verifyIdToken( $id_token );

		if ( ! $data || is_wp_error( $data ) ) {
			error_log( 'Login Me Now - ' . print_r( $data ) );

			return;
		}

		$this->_auth( $data );
	}

	private function _auth( array $data ): void {
		$this->user_data['ID']           = '';
		$this->user_data['email']        = $data['email'] ?? '';
		$this->user_data['first_name']   = $data['given_name'] ?? '';
		$this->user_data['last_name']    = $data['family_name'] ?? '';
		$this->user_data['display_name'] = $data['name'] ?? '';
		$this->user_data['name']         = $data['name'] ?? '';
		$this->user_data['picture']      = $data['picture'] ?? '';

		$this->authenticate();
	}
}