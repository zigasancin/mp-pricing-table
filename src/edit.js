import { TextControl, Flex, FlexBlock, FlexItem, Button } from '@wordpress/components'
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	const fields = [ 'plan', 'price', 'description', 'features', 'cta_text' ];
	const isFeatures = ( field ) => field === 'features' ? [] : '';

	function addFeature( index ) {
		setAttributes( { [ 'features' + index ]: attributes[ 'features' + index ].concat ( [undefined] ) } );
	}

	function removeFeature( indexDelete, attributeIndex ) {
		if ( 1 < attributes[ 'features' + attributeIndex ].length ) {
			const newFeatures = attributes[ 'features' + attributeIndex ].filter( function( x, index ) {
				return index != indexDelete;
			} );

			setAttributes( { [ 'features' + attributeIndex ]: newFeatures } );
		}
	}

	function addTier() {
		const tiers = attributes.tiers;
		if ( 2 == tiers ) {
			const newAttrs = {};

			fields.forEach( field => {
				newAttrs[ field + tiers ] = isFeatures( field );
			} );

			newAttrs.tiers = tiers + 1;

			setAttributes( newAttrs );
		}
	}

	function removeTier( index ) {
		const tiers = attributes.tiers;

		if ( index < 0 || index >= tiers ) {
			return;
		}

		const newAttrs = {};

		fields.forEach( ( field ) => {
			const current = Array.from( { length: tiers }, ( _, i ) => {
				const v = attributes[ field + i ];
				
				return v !== undefined ? v : isFeatures( field );
			} );

			current.splice( index, 1 );

			current.forEach( ( v, i ) => {
				newAttrs[ field + i ] = v;
			} );

			newAttrs[ field + ( tiers - 1 ) ] = isFeatures( field );
		} );

		newAttrs.tiers = tiers - 1;

		setAttributes( newAttrs );
	}


	function createBlock() {
		return (
			<>
				{ Array.from( { length: attributes.tiers }, ( _, attributeIndex ) => (
					<FlexBlock>
						<TextControl value={ attributes[ 'plan' + attributeIndex ] } onChange={ ( value ) => setAttributes( { [ 'plan' + attributeIndex ]: value } ) } placeholder={ __( 'Plan', 'mp-pricing-table' ) } />
						<TextControl value={ attributes[ 'price' + attributeIndex ] } onChange={ ( value ) => setAttributes( { [ 'price' + attributeIndex ]: value } ) } placeholder={ __( 'Price', 'mp-pricing-table' ) } />
						<div className="components-base-control__field" style={ { marginBottom: 'calc(8px)' } }>
							<RichText value={ attributes[ 'description' + attributeIndex ] } onChange={ ( value ) => setAttributes( { [ 'description' + attributeIndex ]: value } ) } className="components-text-control__input mp-pricing-table-description" placeholder={ __( 'Description', 'mp-pricing-table' ) } />
						</div>

						{ attributes[ 'features' + attributeIndex ].map( ( feature, index ) => {
							return (
								<Flex>
									<FlexBlock>
										<TextControl autoFocus={ feature == undefined } value={ feature } onChange={ ( newValue ) => {
											const newFeatures = attributes[ 'features' + attributeIndex ].concat( [] )
											newFeatures[ index ] = newValue
											setAttributes( { [ 'features' + attributeIndex ]: newFeatures } )
										} } placeholder={ __( 'Feature', 'mp-pricing-table' ) } />
									</FlexBlock>
									<FlexItem>
										<Button variant="link" onClick={ () => addFeature( attributeIndex ) }>{ __( 'Add', 'mp-pricing-table' ) }</Button>
									</FlexItem>
									<FlexItem>
										<Button variant="link" onClick={ () => removeFeature( index, attributeIndex ) }>{ __( 'Remove', 'mp-pricing-table' ) }</Button>
									</FlexItem>
								</Flex>
							)
						} ) }

						<RichText allowedFormats={ [ 'core/link' ] } tagName="a" value={ attributes[ 'cta_text' + attributeIndex ] } onChange={ ( value ) => setAttributes( { [ 'cta_text' + attributeIndex ]: value } ) } placeholder={ __( 'CTA Button', 'mp-pricing-table' ) } />
						
						<p>
							<Button variant="secondary" onClick={ () => removeTier( attributeIndex ) }>{ __( 'Remove Tier', 'mp-pricing-table' ) }</Button>
						</p>
					</FlexBlock>
				) ) }

			</>
		)
	}

	return (
		<div { ...blockProps }>
			<Flex style={ { marginBottom: '20px' } }>
				{ createBlock() }
			</Flex>
			<Button variant="primary" style={ { marginBottom: '20px' } } onClick={ () => addTier() }>{ __( 'Add Tier', 'mp-pricing-table' ) }</Button>
		</div>
	);
}