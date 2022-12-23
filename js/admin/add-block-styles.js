// Theme Buttons via Native Wordpress buttons
wp.blocks.registerBlockStyle('core/button', { name: 'dark-button', label: 'Dark' });

// Heading / paragraph "larger" styles
wp.blocks.registerBlockStyle('core/heading', { name: 'larger', label: 'Larger text' });
wp.blocks.registerBlockStyle('core/paragraph', { name: 'larger', label: 'Larger text' });

// Paragraph "smaller" styles
wp.blocks.registerBlockStyle('core/paragraph', { name: 'smaller', label: 'Smaller text' });
wp.blocks.registerBlockStyle('core/paragraph', { name: 'smaller--sm', label: 'Smaller text on mobile' });

// Columns no spacing 
wp.blocks.registerBlockStyle('core/columns', { name: 'no-gap', label: 'Remove column gap' });
wp.blocks.registerBlockStyle('core/columns', { name: 'larger-gap', label: 'Larger column gap' });

// Cover, rounded corners
wp.blocks.registerBlockStyle('core/cover', { name: 'rounded', label: 'Rounded corners' });
