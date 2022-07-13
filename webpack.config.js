const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = ({ development }) => ({
	entry: "./src/index.ts",
	devtool: development ? "inline-source-map" : false,
	mode: development ? "development" : "production",
	optimization: {
		minimize: false
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
		library: "fb-helper",
		libraryExport: "default",
		libraryTarget: "umd",
		umdNamedDefine: true,
		globalObject: "typeof self === 'undefined' ? this : self",
	},
	resolve: {
		extensions: [
			".ts"
		],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					"babel-loader", "ts-loader"
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ESLintPlugin({
			extensions: [
				"ts"
			]
		})
	],
});