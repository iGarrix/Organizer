/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			xs: '350px', // Small phones
			sm: '640px', // Small phones
			md: '768px', // Medium phones
			lg: '1024px', // Large phones
			xl: '1280px', // Extra large phones
			'2xl': '1440px', // Small tablets and larger
			'3xl': '1920px', // Medium tablets and larger
			'4xl': '2560px', // Large tablets and larger
			'5xl': '3840px', // Desktops and larger
		},
		fontFamily: {
			root: ['var(--root-font)', 'serif'],
			borel: ['var(--borel)', 'serif'],
		},
		extend: {
			keyframes: {
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' },
				},
			},
			colors: {
				light: {
					DEFAULT: '#FAFAFA',
				},
				accent: {
					blue: '#0CB0EF',
					green: '#3BEA62',
				},
			},
		},
		animation: {
			'caret-blink': 'caret-blink 1.25s ease-out infinite',
		},
	},
	plugins: [require('tailwindcss-animate')],
}
export default config
