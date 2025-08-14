<section class="mp-pricing-table">
	<?php for ( $i = 0; $i < $attributes['tiers']; $i++ ) : ?>
		<div class="mp-pricing-table-block" tabindex="-1">
			<?php
			echo '<div class="mp-pricing-table-plan">' . esc_html( $attributes['plan' . $i ] ) . '</div>';
			echo '<p>' . esc_html( $attributes['price' . $i ] ) . '</p>';
			echo '<div class="mp-pricing-table-cta_text">' . wp_kses_post( $attributes['cta_text' . $i ] ) . '</div>';
			echo '<p>' . wp_kses_post( $attributes['description' . $i ] ) . '</p>';
			?>

			<div>
				<ul>
					<?php
					foreach ( $attributes['features' . $i ] as $feature ) {
						echo '<li>' . esc_html( $feature ) . '</li>';
					}
					?>
				</ul>
			</div>
		</div>
	<?php endfor; ?>
</section>