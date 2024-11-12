/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			xs: "320px", // Small phones
			sm: "640px", // Small phones
			md: "768px", // Medium phones
			lg: "1024px", // Large phones
			xl: "1280px", // Extra large phones
			"2xl": "1440px", // Small tablets and larger
			"3xl": "1920px", // Medium tablets and larger
			"4xl": "2560px", // Large tablets and larger
			"5xl": "3840px", // Desktops and larger
		},
		fontFamily: {
			root: ["var(--root-font)", "serif"],
			borel: ["var(--borel)", "serif"],
			fira: ["var(--fira-font)", "serif"],
			sourcecode: ["var(----sourcecode-font)", "serif"],
		},
		extend: {
			keyframes: {
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				dark: {
					100: "#2b2d30",
					200: "#1e1f22",
				},
				light: {
					DEFAULT: "#FAFAFA",
				},
				accent: {
					blue: "#0CB0EF",
					green: "#3BEA62",
				},
			},
		},
		// animation: {
		// 	'caret-blink': 'caret-blink 1.25s ease-out infinite',
		// },
	},
	plugins: [require("tailwindcss-animate")],
}
export default config
