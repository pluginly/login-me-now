<?php
/**
 * @author  WPtownhall
 * @since   1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Providers;

use LoginMeNow\Common\IntegrationBase;
use LoginMeNow\Common\ProviderBase;
use LoginMeNow\Integrations\Directorist\Directorist;
use LoginMeNow\Integrations\WooCommerce;

class IntegrationsServiceProvider extends ProviderBase {

	public function boot() {
		foreach ( $this->get_integrations() as $_integration ) {
			$integration = new $_integration();
			if ( $integration instanceof IntegrationBase ) {
				$integration->boot();
			}
		}
	}

	public function get_integrations(): array {
		return [
			Directorist::class,
			WooCommerce::class,
		];
	}
}