# patter-core-styles

Core SCSS UI Kit & JS Lib

Written for Wordpress 5.9+ themes by Patter Agency, but can be used anywhere

## Publishing

Update `version` in package.json

`$ npm run publish-package`

## Styles Usage

Add the following line into you main SCSS import
`@use '~@patter/patter-core-styles/scss/main';`

If using animations:
`@use '~@patter/patter-core-styles/scss/aos-animations';`

If using wordpress: 
`@use '~@patter/patter-core-styles/scss/wordpress-public';`
`@use '~@patter/patter-core-styles/scss/wordpress-admin';`

### Mixins, Breakpoints, & Functions

Useful for child wordpress themes already relying on a larger library

Add the following line into you main SCSS import
`@use '~@patter/patter-core-styles/scss/helpers';`

### Defaults

```scss
$primary: #e51c3a !default;
$secondary: #2a3140 !default;
$heading: #171717 !default;
$text: #171717 !default;
$danger: #d8000c !default;
```

## JS Usage

Add the following line into you main public import
`import '@patter/patter-core-styles/js/public.js';`

Add the following line into you main admin import
`import '@patter/patter-core-styles/js/admin.js';`
