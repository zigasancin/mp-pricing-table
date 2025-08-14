## Mp Pricing Table
Contributors: Žiga  
Tags: block  
Tested up to: 6.8  
Stable tag: 1.0.0

## Installation

1. Download plugin from the Releases section in the Github repository.
2. Move the plugin folder to the `/wp-content/plugins` directory.
3. Activate the plugin through the 'Plugins' screen in WordPress.

## Usage

Insert the MP Pricing Table block in WP Admin like any other block by selecting the plus sign and typing pricing table into the search field. After the block appears, begin to add / remove additional tiers with all the information.

## Assumptions

The pricing table is wrapped as a flexbox in WP Admin and as a grid on frontend (the default WordPress block grid component is still experimental). The default tier count is 2 as defined under attributes in block.json.

## Considerations

#### Files in the src folder
- edit.js: includes the Edit component
- editor.scss: gets loaded only in the Gutenberg editor
- index.js: the main block file; loads styles, registers the block and imports the metadata from block.json
- render.php: displays the block on the frontend
- style.scss: gets loaded in the Gutenberg editor and on the frontend
- view.js gets: loaded on the frontend

#### Accessibility
Each tier has a negative tabindex, so we remove it from the keyboard tab order, but it is still programmatically focusable. Screen readers are still able to read what is inside the block and the links are in the correct tabbing order; tested with Firefox' Accessibility inspector.

#### Performance / Animations
We use small animations when focusing the blocks, but also support the prefers-reduced-motion option.

#### Link vs. Button
A RichText component allows us to add a link, modify the text and apply any other styling formatting options than using the Button or even a custom component. Also, it outputs an accessible anchor tag, which you can style for frontend like a button.
