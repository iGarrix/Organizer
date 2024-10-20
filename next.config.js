/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	optimizeFonts: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				port: '',
				pathname: '**',
			},
		],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}

module.exports = nextConfig
