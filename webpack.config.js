const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')


const optimisation = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd) {
		config.minimizer = [
			new TerserPlugin(),
			new OptimizeCssAssetsPlugin(),
		]
	}
	return config
}

const file_name = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
	const loaders = [{
		loader: MiniCssExtractPlugin.loader,
		options: {
			esModule: isDev,
		},
	},
		'css-loader',
	]
	if (extra) {
		loaders.push(extra)
	}
	return loaders
}
const babelOption = preset => {
	const opts = {
		presets: [
			'@babel/preset-env',
		],
		plugins: [
			'@babel/plugin-proposal-class-properties'
		]
	}
	if (preset) {
		opts.presets.push(preset)
	}
	return opts
}
const jsLoaders = () => {
	const loaders = [{
		loader: 'babel-loader',
		options: babelOption()
	}]
	if (isDev) {
		loaders.push('eslint-loader')
	}
	return loaders
}

const plugins = () => {
	const base = [
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: file_name('css')
		}),
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: path.resolve(__dirname, 'src/favicon.ico'),
		// 			to: path.resolve(__dirname, 'dist')
		// 		}
		// 	]
		// }
		// ),
	]
	if (isProd) {
		base.push(new BundleAnalyzerPlugin())
	}
	return base
}

module.exports = {
	context: path.resolve(__dirname, 'client/src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.jsx'],
	},
	output: {
		filename: file_name('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@models': path.resolve(__dirname, 'src/models'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	optimization: optimisation(),
	devServer: {
		port: 3000,
		hot: isDev,
		open: true
	},
	devtool: isDev ? 'source-map' : '',
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: cssLoaders()
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			},
			{
				test: /\.m?ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOption('@babel/preset-typescript')
				}
			},
			{
				test: /\.m?jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOption('@babel/preset-react')
				}
			},

		]
	}
}