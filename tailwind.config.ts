
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(142, 76%, 36%)', // Verde brasileiro
					foreground: 'hsl(0, 0%, 100%)'
				},
				secondary: {
					DEFAULT: 'hsl(217, 91%, 60%)', // Azul moderno
					foreground: 'hsl(0, 0%, 100%)'
				},
				destructive: {
					DEFAULT: 'hsl(0, 84.2%, 60.2%)',
					foreground: 'hsl(210, 40%, 98%)'
				},
				muted: {
					DEFAULT: 'hsl(210, 40%, 96.1%)',
					foreground: 'hsl(215.4, 16.3%, 46.9%)'
				},
				accent: {
					DEFAULT: 'hsl(210, 40%, 96.1%)',
					foreground: 'hsl(222.2, 47.4%, 11.2%)'
				},
				popover: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(222.2, 84%, 4.9%)'
				},
				card: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(222.2, 84%, 4.9%)'
				},
				// Cores específicas do FutTalent
				'green': {
					50: 'hsl(142, 76%, 95%)',
					100: 'hsl(142, 76%, 90%)',
					200: 'hsl(142, 76%, 80%)',
					300: 'hsl(142, 76%, 70%)',
					400: 'hsl(142, 76%, 60%)',
					500: 'hsl(142, 76%, 50%)',
					600: 'hsl(142, 76%, 36%)', // Primary green
					700: 'hsl(142, 76%, 30%)',
					800: 'hsl(142, 76%, 25%)',
					900: 'hsl(142, 76%, 20%)',
				},
				'blue': {
					50: 'hsl(217, 91%, 95%)',
					100: 'hsl(217, 91%, 90%)',
					200: 'hsl(217, 91%, 80%)',
					300: 'hsl(217, 91%, 70%)',
					400: 'hsl(217, 91%, 60%)',
					500: 'hsl(217, 91%, 50%)',
					600: 'hsl(217, 91%, 40%)', // Primary blue
					700: 'hsl(217, 91%, 35%)',
					800: 'hsl(217, 91%, 30%)',
					900: 'hsl(217, 91%, 25%)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
