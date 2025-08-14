/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button
} from '@wordpress/components'
import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param  {Object}   props               The block props.
 * @param  {Object}   props.attributes    Block attributes.
 * @param  {Function} props.setAttributes Sets the value for block attributes.
 * @return {Function}                     Render the edit screen
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	/**
	 * Available fields.
	 */
	const fields = [ 'plan', 'price', 'description', 'features', 'cta_text' ];

	/**
	 * Check whether an attribute is a features array or not.
	 * 
	 * @param   {string}       attr Attribute name.
	 * @returns {array|string}      Empty array or string.
	 */
	const isFeatures = ( attr ) => attr === 'features' ? [] : '';

	/**
	 * Add a feature of a tier.
	 * 
	 * @param   {int}  index Tier index.
	 * @returns {void}
	 */
	function addFeature( index ) {
		setAttributes( { [ 'features' + index ]: attributes[ 'features' + index ].concat ( [undefined] ) } );
	}

	/**
	 * Remove a feature from a tier.
	 * 
	 * @param   {int}  indexDelete    Feature index.
	 * @param   {int}  attributeIndex Tier index.
	 * @returns {void}
	 */
	function removeFeature( indexDelete, attributeIndex ) {
		if ( 1 < attributes[ 'features' + attributeIndex ].length ) {
			const newFeatures = attributes[ 'features' + attributeIndex ].filter( function( x, index ) {
				return index != indexDelete;
			} );

			setAttributes( { [ 'features' + attributeIndex ]: newFeatures } );
		}
	}

	/**
	 * Add a tier.
	 * 
	 * @param   {int}  indexDelete    Feature index.
	 * @param   {int}  attributeIndex Tier index.
	 * @returns {void}
	 */
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

	/**
	 * Remove a tier.
	 * 
	 * @param   {int}  index Tier index.
	 * @returns {void}
	 */
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

	/**
	 * Create the pricing table.
	 * 
	 * @returns {void}
	 */
	function createBlock() {
		return (
			<>
				{ Array.from( { length: attributes.tiers }, ( _, attributeIndex ) => (
					<FlexBlock>
						<TextControl
							value={ attributes[ 'plan' + attributeIndex ] }
							onChange={ ( value ) => setAttributes( { [ 'plan' + attributeIndex ]: value } ) }
							placeholder={ __( 'Plan', 'mp-pricing-table' ) }
						/>
						<TextControl
							value={ attributes[ 'price' + attributeIndex ] }
							onChange={ ( value ) => setAttributes( { [ 'price' + attributeIndex ]: value } ) }
							placeholder={ __( 'Price', 'mp-pricing-table' ) }
						/>
						<div className="components-base-control__field" style={ { marginBottom: 'calc(8px)' } }>
							<RichText
								value={ attributes[ 'description' + attributeIndex ] }
								onChange={ ( value ) => setAttributes( { [ 'description' + attributeIndex ]: value } ) }
								className="components-text-control__input mp-pricing-table-description"
								placeholder={ __( 'Description', 'mp-pricing-table' ) }
							/>
						</div>

						{ attributes[ 'features' + attributeIndex ].map( ( feature, index ) => {
							return (
								<Flex>
									<FlexBlock>
										<TextControl
											autoFocus={ feature == undefined }
											value={ feature }
											onChange={ ( newValue ) => {
												const newFeatures = attributes[ 'features' + attributeIndex ].concat( [] );
												newFeatures[ index ] = newValue;
												setAttributes( { [ 'features' + attributeIndex ]: newFeatures } );
											} }
											placeholder={ __( 'Feature', 'mp-pricing-table' ) }
										/>
									</FlexBlock>
									<FlexItem>
										<Button
											variant="link"
											onClick={ () => addFeature( attributeIndex ) }>
											{ __( 'Add', 'mp-pricing-table' ) }
										</Button>
									</FlexItem>
									<FlexItem>
										<Button
											variant="link"
											onClick={ () => removeFeature( index, attributeIndex ) }>
											{ __( 'Remove', 'mp-pricing-table' ) }
										</Button>
									</FlexItem>
								</Flex>
							)
						} ) }

						<RichText
							allowedFormats={ [ 'core/link' ] }
							tagName="a"
							value={ attributes[ 'cta_text' + attributeIndex ] }
							onChange={ ( value ) => setAttributes( { [ 'cta_text' + attributeIndex ]: value } ) }
							placeholder={ __( 'CTA Button', 'mp-pricing-table' ) }
						/>

						<p>
							<Button
								variant="secondary"
								onClick={ () => removeTier( attributeIndex ) }>
								{ __( 'Remove Tier', 'mp-pricing-table' ) }
							</Button>
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
			<Button
				variant="primary"
				style={ { marginBottom: '20px' } }
				onClick={ () => addTier() }>{ __( 'Add Tier', 'mp-pricing-table' ) }
			</Button>
		</div>
	);
}