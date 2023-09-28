<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\UserSwitching;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AdminNotice {
	use Hookable;
	use Singleton;

	private function __construct() {
		if ( ! is_admin() ) {
			return;
		}

		$this->action( 'admin_notices', 'user_switching' );
	}

	public function user_switching(): void {
		?>
		<div class="error">
			<p>
			<?php _e( 'Since you are using Login Me Now, you can deactivate the <strong>User Switching</strong> plugin, If you are not interested to deactivate the User Switching plugin, simply turn off the `User Switching` from <strong>Dashboard -> Settings -> General -> User Switching</strong>..',
			'login-me-now' );?>
			</p>
		</div>
	<?php }
}