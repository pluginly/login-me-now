<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Utils;

class Translator {
	public static function encode( string...$items ): string{
		$single = "";
		foreach ( $items as $item ) {
			$single .= $item . " ";
		}

		return trim( base64_encode( $single ) );
	}

	public static function decode( string $data ): array{
		$decodedData = base64_decode( $data );
		$items       = explode( " ", $decodedData );

		return $items;
	}
}