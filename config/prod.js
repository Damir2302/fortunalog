const webpack = require('webpack')

const paths = require('./paths')
const { merge } = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const ImageminPlugin = require('imagemin-webpack-plugin').default
// const imageminMozjpeg = require('imagemin-mozjpeg')
// const imageminJpegtran = require('imagemin-jpegtran')
// const imageminSvgo = require('imagemin-svgo')
// const imageminGifsicle = require('imagemin-gifsicle')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")

const common = require('./common')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const PAGES_DIR = `${paths.src}/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
	    filename: 'js/[name].[contenthash].bundle.js',
	    // chunkFilename: 'js/[name].[contenthash].chunk.js'
	},
	target: 'browserslist',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						// Lossless optimization with custom option
						// Feel free to experiment with options for better result for you
						plugins: [
							["gifsicle", {interlaced: true}],
							["jpegtran", {progressive: true}],
							["optipng", {optimizationLevel: 5}],
							// Svgo configuration here https://github.com/svg/svgo#configuration
							[
								"svgo",
								{
									plugins: [
										{
											name: "preset-default",
											params: {
												overrides: {
													removeViewBox: false,
													addAttributesToSVGElement: {
														params: {
															attributes: [
																{xmlns: "http://www.w3.org/2000/svg"},
															],
														},
													},
												},
											},
										},
									],
								},
							],
						],
					},
				},
			})
		],
	},
	plugins: 
		[
			new MiniCssExtractPlugin({
		      filename: 'css/[name].[contenthash].css',
		      // chunkFilename: '[id].css'
		      // chunkFilename: '[name].css'
		      // chunkFilename: '[name].[contenthash].css'
		    }),

			...PAGES.map(page => new HtmlWebpackPlugin({
				template: `${PAGES_DIR}/${page}`,
				filename: `./${page.replace(/\.pug/,'.html')}`
			}))
		],
	performance: {
	    hints: 'warning',
	    maxEntrypointSize: 512000,
	    maxAssetSize: 512000
	}
})