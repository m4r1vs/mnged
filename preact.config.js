const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export default function (config, env, helpers) {
	config.plugins.push(new BundleAnalyzerPlugin());
	config.node.fs = 'empty';
	config.node.child_process = 'empty';
}