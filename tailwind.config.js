/** @type {import('tailwindcss').Config} */

// Colors resolve through CSS custom properties defined in
// themes/hugo-saasify-theme/assets/css/main.css so a `.dark` block can
// reassign them later without touching any component markup.
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

const ramp = (prefix, stops) =>
  Object.fromEntries(stops.map((stop) => [stop, token(`${prefix}-${stop}`)]));

const STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

module.exports = {
  presets: [require('./themes/hugo-saasify-theme/tailwind.config.js')],
  content: [
    "./themes/hugo-saasify-theme/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.{html,md}"
  ],
  theme: {
    extend: {
      colors: {
        primary: ramp('primary', STOPS),
        secondary: ramp('secondary', STOPS),
        // Navy-tinted neutral replacing Tailwind's default cool gray, so every
        // existing text-gray-*/border-gray-* utility harmonises with the hero.
        gray: ramp('neutral', STOPS),
        // Service and company pages were authored against `slate`. Point it at
        // the same ramp so they pick up the palette without rewriting markup.
        slate: ramp('neutral', STOPS),
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },

      // Optical type scale: the larger the type, the tighter the tracking and
      // line-height. This is most of what separates "designed" from "default".
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.004em' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.65', letterSpacing: '-0.004em' }],
        xl: ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.008em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.016em' }],
        '3xl': ['1.875rem', { lineHeight: '1.24', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.14', letterSpacing: '-0.023em' }],
        '5xl': ['3rem', { lineHeight: '1.07', letterSpacing: '-0.026em' }],
        '6xl': ['3.75rem', { lineHeight: '1.03', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.032em' }],
      },

      letterSpacing: {
        eyebrow: '0.08em',
      },

      // Restrained radii. Replaces the theme's blanket 2rem override.
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.625rem',
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },

      // Low-contrast, tinted shadows. Shadow is a supporting cue here, not the
      // primary way elements separate from the page — borders do that.
      boxShadow: {
        xs: '0 1px 2px 0 rgb(14 17 25 / 0.04)',
        sm: '0 1px 2px 0 rgb(14 17 25 / 0.05), 0 1px 1px 0 rgb(14 17 25 / 0.03)',
        DEFAULT: '0 1px 3px 0 rgb(14 17 25 / 0.06), 0 1px 2px -1px rgb(14 17 25 / 0.04)',
        md: '0 4px 12px -2px rgb(14 17 25 / 0.07), 0 2px 4px -2px rgb(14 17 25 / 0.04)',
        lg: '0 12px 24px -6px rgb(14 17 25 / 0.08), 0 4px 8px -4px rgb(14 17 25 / 0.04)',
        xl: '0 24px 48px -12px rgb(14 17 25 / 0.12)',
        elevation: '0 8px 24px -8px rgb(14 17 25 / 0.10), 0 2px 6px -2px rgb(14 17 25 / 0.05)',
      },

      maxWidth: {
        prose: '68ch',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
