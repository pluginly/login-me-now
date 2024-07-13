<?php
/**
 * @author  Pluginly
 * @since   1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Common\AjaxCheck;
use LoginMeNow\Repositories\SettingsRepository;

class Ajax {
	use AjaxCheck;

	private array $errors;

	public function __construct() {
		add_action( 'wp_ajax_login_me_now_update_admin_setting', [$this, 'login_me_now_update_admin_setting'] );
	}

	/**
	 * Return boolean settings for admin dashboard app.
	 */
	public function login_me_now_admin_settings_typewise(): array {
		return apply_filters(
			'login_me_now_admin_settings_datatypes',
			[

				'logs'                           => 'bool',
				'logs_expiration'                => 'integer',

				'google_login'                   => 'bool',
				'google_client_id'               => 'string',
				'google_client_secret'           => 'string',
				'google_native_login'            => 'bool',
				'google_onetap'                  => 'bool',
				'google_cancel_on_tap_outside'   => 'bool',
				'google_onetap_display_location' => 'string',

				'dm_advance_share'               => 'bool',
				'dm_express_login_wc'            => 'bool',
				'dm_express_login_edd'           => 'bool',
				'dm_express_login_email'         => 'bool',
				'dm_otp_login'                   => 'bool',

				'social_login'                   => 'bool',
				'user_switching'                 => 'bool',
				'temporary_login'                => 'bool',
				'browser_extension'              => 'bool',
				'activity_logs'                  => 'bool',
				'enable_sign_in_google'          => 'bool',
				'enable_sign_in_facebook'        => 'bool',
				'enable_sign_in_twitter'         => 'bool',
				'login_layout'                   => 'string',
				'login_button_style'             => 'string',

				'facebook_login'                 => 'bool',
				'facebook_app_id'                => 'string',
				'facebook_app_secret'            => 'string',
				'facebook_native_login'          => 'bool',
			]
		);
	}

	/**
	 * Save settings.
	 */
	public function login_me_now_update_admin_setting() {
		$error = $this->check_permissions( 'login_me_now_update_admin_setting', 'manage_options' );
		if ( $error ) {
			wp_send_json_error( $error );
		}

		$get_bool_settings = $this->login_me_now_admin_settings_typewise();
		/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$sub_option_key = isset( $_POST['key'] ) ? sanitize_text_field( wp_unslash( $_POST['key'] ) ) : '';
		/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$sub_option_value = '';

		// @codingStandardsIgnoreStart
		if ( isset( $get_bool_settings[$sub_option_key] ) ) {
			if ( 'bool' === $get_bool_settings[$sub_option_key] ) {
				/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
				$val = isset( $_POST['value'] ) && 'true' === sanitize_text_field( $_POST['value'] ) ? true : false;
				/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
				$sub_option_value = $val;
			} else {
				/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
				$val = isset( $_POST['value'] ) ? sanitize_text_field( wp_unslash( $_POST['value'] ) ) : '';
				/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
				$sub_option_value = $val;
			}
		}
		// @codingStandardsIgnoreEnd

		SettingsRepository::update( $sub_option_key, $sub_option_value );

		$response_data = [
			'message' => __( 'Successfully saved data!', 'login-me-now' ),
		];

		wp_send_json_success( $response_data );
	}
}