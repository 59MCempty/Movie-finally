/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter, Avenir, Helvetica, Arial, sans-serif"],
		},
		extend: {
			colors: {
				black1: "#04152d",
				black2: "#041226",
				black3: "#020c1b",
				blackLighter: "#1c4b91",
				blackLight: "#173d77",
				pink: "#da2f68",
				orange: "#f89e00",
				gradient: "linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)",
			},
			boxShadow: {
				'pink': '0 0 0.625em var(--pink)',
			}
		},
	},
	plugins: [
		require("tailwind-scrollbar-hide"),
		// ...
	],
}
