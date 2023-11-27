import { registerBlockStyle } from "@wordpress/blocks";

// Theme Buttons via Native Wordpress buttons
registerBlockStyle("core/button", { name: "dark-button", label: "Dark" });
// registerBlockStyle('core/button', { name: 'large-button', label: 'Large button' });

// Heading / paragraph "larger" styles
registerBlockStyle("core/heading", { name: "larger", label: "Larger text" });
registerBlockStyle("core/paragraph", { name: "larger", label: "Larger text" });
registerBlockStyle("core/paragraph", { name: "x-larger", label: "X-Larger text", });

// Paragraph "smaller" styles
registerBlockStyle("core/paragraph", { name: "smaller", label: "Smaller text", });
registerBlockStyle("core/paragraph", { name: "smaller--sm", label: "Smaller text on mobile", });

// Columns no spacing
registerBlockStyle("core/columns", { name: "no-gap", label: "Remove column gap" });
registerBlockStyle("core/columns", { name: "smaller-gap", label: "Smaller column gap", });
registerBlockStyle("core/columns", { name: "larger-gap", label: "Larger column gap", });

// Group
registerBlockStyle("core/group", { name: "rounded", label: "Rounded corners" });

// Cover, rounded corners
registerBlockStyle("core/cover", { name: "rounded", label: "Rounded corners" });

// Tables
registerBlockStyle("core/table", { name: "separated", label: "Separated borders" });
