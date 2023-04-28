const webpack = require('webpack')

const paths = require('./paths')
const { merge } = require('webpack-merge')

const common = require('./common')

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	// output: {
	//     filename: 'js/[name].[contenthash].bundle.js',
	// },
	target: 'browserslist',
	optimization: {
		splitChunks: {
			// chunks: 'all',
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					// filename: 'js/plugins.js',
					filename: 'js/[name].plugin.js',
					chunks: 'all',
				},
			},
		},
	},
	performance: {
	    hints: 'warning',
	    maxEntrypointSize: 512000,
	    maxAssetSize: 512000
	}
})