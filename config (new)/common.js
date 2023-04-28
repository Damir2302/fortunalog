const webpack = require('webpack')

const paths = require('./paths')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const PugPlugin = require('pug-plugin')

const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const rawPages = fs.readdirSync(paths.src).filter(fileName => fileName.endsWith('.pug'))

let pagesList = {}
rawPages.forEach((value) => pagesList[`${value.replace(/\.pug/,'')}`] = `./${value}`);

module.exports = {
	context: paths.src,
	entry: pagesList,
	output: {
		path: paths.dist,
		filename: './js/[name].bundle.js',
		clean: true,
		publicPath: isProd ? './' : '/',
	},
	cache: false,
	module: {
		rules: [
			// PUG
			{
				test: /\.pug$/,
				loader: PugPlugin.loader,
				options: {
					data: {
						isProd // pass global variable into all Pug files
					}
				},
			},
			// JS
			{
				test: /\.js$/i,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
			},
			// CSS, SASS|SCSS
			{
				test: /\.(css|sass|scss)$/,
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									postcssPresetEnv({
										stage: 2, // 0 (experimental) - 4 (stable) | default is 2
										browsers: 'defaults'
									})
								],
							},
						}
					},
					// Compiles Sass to CSS
					'sass-loader',
				]
			},
		]
	},
	plugins:
		[
			new CopyWebpackPlugin({
				patterns: [
					// images
					{ from: './images', to: `${paths.dist}/images`, noErrorOnMissing: true, },
					// fonts
					{ from: './fonts', to: `${paths.dist}/fonts`, noErrorOnMissing: true, }
				],
			}),
			new PugPlugin({
				pretty: !isProd, // formatting HTML, useful for development mode
				js: {
					// output filename of extracted JS file from source script
					// filename: '/js/[name].[contenthash:8].js',
					filename: '[name].min.js',
					outputPath: 'js',
				},
				css: {
					// output filename of extracted CSS file from source style
					// filename: '/css/[name].[contenthash:8].css',
					filename: '[name].min.css',
					outputPath: 'css',
				},
			}),
		]
}