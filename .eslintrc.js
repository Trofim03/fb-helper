module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module",
		"project": "./tsconfig.json"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"max-len": [
			"error", {
				"code": 150, "tabWidth": 8
			}
		],
		"array-bracket-newline": [
			"error", "always"
		],
		"semi": [
			"error",
			"always"
		],
		"function-paren-newline": ["error", { "minItems": 3 }],
		"object-curly-newline": [
			"error", {
				"ObjectExpression": "always",
				"ObjectPattern": {
					"multiline": true
				},
				"ImportDeclaration": {
					"multiline": true, "minProperties": 3
				},
				"ExportDeclaration": {
					"multiline": true, "minProperties": 3
				}
			}
		]
	}
};
