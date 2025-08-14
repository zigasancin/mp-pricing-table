/**
 * Frontend script
 */
( () => {
	document.addEventListener( 'DOMContentLoaded', () => {
		const pricingTableBlocksLinks = document.querySelectorAll( '.mp-pricing-table-block a' );
		for ( let i = 0; i < pricingTableBlocksLinks.length; i++ ) {
			pricingTableBlocksLinks[ i ].addEventListener( 'click', ( e ) => {
				e.stopPropagation();
			} );
		}

		const pricingTableBlocks = document.querySelectorAll( '.mp-pricing-table-block' );
		for ( let i = 0; i < pricingTableBlocks.length; i++ ) {
			pricingTableBlocks[ i ].addEventListener( [ 'click', 'keyup' ], ( e ) => {
				e.preventDefault();

				pricingTableBlocks[ i ].focus()
			} );
		}
	} );
} )();