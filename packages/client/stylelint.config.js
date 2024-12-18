export default {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-clean-order',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,

    'number-max-precision': 2,

    'length-zero-no-unit': true,

    'unit-no-unknown': [true, { ignoreUnits: ['fr'] }],

    'shorthand-property-no-redundant-values': true,

    'property-no-unknown': true,

    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,

    'block-no-empty': true,

    'selector-attribute-quotes': 'always',
    'selector-max-id': 1,
    'selector-max-universal': 1,
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': true,

    'rule-empty-line-before': [
      'always',
      { ignore: ['after-comment', 'first-nested', 'inside-block'] },
    ],

    'media-feature-name-no-unknown': true,

    'comment-no-empty': true,
  },
  ignoreFiles: ['dist/**', 'node_modules/**'],
};
