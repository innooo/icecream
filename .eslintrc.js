// module.exports = {
//     "extends": "standard"
// };

module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "node": true,
      "mocha": true
    },
    "globals": {
      "Babel": true,
      "React": true
    },
    "plugins": [
      "react"
    ],
    "rules": {
      "global-require": "off",
      "no-continue": "off",
      "no-param-reassign": "off",
      "no-underscore-dangle": "off",
      "no-new-func": "off",
      "no-restricted-syntax": "off",
      "no-prototype-builtins": "off",
      "no-mixed-operators": "off",
      "new-parens": "off",
      "import/no-unresolved": "off",
      "react/prefer-stateless-function": "off",
      "react/jsx-first-prop-new-line": "off",
      "react/no-multi-comp": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-no-bind": "off",
      "react/forbid-prop-types": "off",
      "react/prop-types": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "class-methods-use-this": "off",
      "linebreak-style": "off",
      "comma-dangle": "off",
      "eol-last": "off"
    }
  }
    