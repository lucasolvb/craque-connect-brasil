
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
					DEFAULT: 'hsl(120, 61%, 34%)', // Verde brasileiro vibrante #228B22
					foreground: 'hsl(0, 0%, 100%)'
				},
				secondary: {
					DEFAULT: 'hsl(219, 79%, 66%)', // Azul brasileiro #1E40AF
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
				// Cores específicas da bandeira brasileira atualizadas
				'green': {
					50: 'hsl(120, 60%, 97%)',
					100: 'hsl(120, 60%, 95%)',
					200: 'hsl(120, 60%, 90%)',
					300: 'hsl(120, 60%, 80%)',
					400: 'hsl(120, 60%, 60%)',
					500: 'hsl(120, 61%, 45%)',
					600: 'hsl(120, 61%, 34%)', // Verde bandeira principal mais vibrante
					700: 'hsl(120, 61%, 25%)',
					800: 'hsl(120, 61%, 20%)',
					900: 'hsl(120, 61%, 15%)',
				},
				'blue': {
					50: 'hsl(219, 79%, 97%)',
					100: 'hsl(219, 79%, 95%)',
					200: 'hsl(219, 79%, 85%)',
					300: 'hsl(219, 79%, 75%)',
					400: 'hsl(219, 79%, 65%)',
					500: 'hsl(219, 79%, 55%)',
					600: 'hsl(219, 79%, 45%)', // Azul bandeira atualizado
					700: 'hsl(219, 79%, 35%)',
					800: 'hsl(219, 79%, 25%)',
					900: 'hsl(219, 79%, 15%)',
				},
				'yellow': {
					50: 'hsl(51, 100%, 97%)',
					100: 'hsl(51, 100%, 95%)',
					200: 'hsl(51, 100%, 85%)',
					300: 'hsl(51, 100%, 75%)',
					400: 'hsl(51, 100%, 65%)',
					500: 'hsl(51, 100%, 50%)', // Amarelo dourado #FFD700
					600: 'hsl(51, 100%, 45%)',
					700: 'hsl(51, 100%, 40%)',
					800: 'hsl(51, 100%, 35%)',
					900: 'hsl(51, 100%, 30%)',
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
