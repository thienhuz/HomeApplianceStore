---
name: Aura Home
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#594139'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#8d7168'
  outline-variant: '#e1bfb5'
  surface-tint: '#ab3500'
  primary: '#ab3500'
  on-primary: '#ffffff'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ffb59d'
  secondary: '#555f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f3'
  on-secondary-container: '#596373'
  tertiary: '#00677e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a7cb'
  on-tertiary-container: '#003744'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#b5ebff'
  tertiary-fixed-dim: '#59d5fb'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 4px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is centered on a **Modern Minimalist** aesthetic tailored for a high-end home appliance e-commerce experience. The brand personality is professional, efficient, and aspirational, focusing on the clarity of product features and the quality of living.

The visual language prioritizes heavy whitespace to allow high-fidelity product photography to serve as the primary visual driver. Elements are characterized by soft depth, generous breathing room, and a sophisticated balance between functional utility and editorial elegance. The goal is to evoke a sense of reliability and modern domesticity, ensuring the user feels confident in high-value purchases.

## Colors
The palette is dominated by a clean, expansive white base to maintain a "gallery" feel. 

- **Primary (#FF6B35):** Used strategically for high-intent actions, promotional badges, and active states. It provides a warm, energetic contrast to the neutral base.
- **Secondary/Text (#1F2937):** A deep charcoal used for primary text, iconography, and grounding elements like the footer or navigation headers.
- **Surface/Neutral (#F9FAFB):** A soft gray used for background sections, input fields, and subtle UI differentiation to prevent visual fatigue.
- **Success/Error:** Standard semantic greens and reds are used sparingly, optimized for legibility against the white background.

## Typography
This design system utilizes **Inter** across all levels to maintain a systematic, neutral, and highly legible appearance. 

The type hierarchy relies on significant weight contrast and tight letter-spacing for headlines to create a modern, "tech-forward" look. Body text uses standard tracking and generous line heights to ensure technical specifications and product descriptions are easy to digest. Labels utilize a slight uppercase treatment for secondary metadata and technical categories.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop and a **Fluid** model on mobile.

- **Desktop:** A 12-column grid with a maximum width of 1280px. Gutters are set to 24px to provide enough breathing room between product cards.
- **Mobile:** A 4-column fluid grid with 20px side margins. 
- **Rhythm:** Spacing follows an 8px linear scale. Vertical stacking between sections should be aggressive (64px to 128px) to reinforce the minimalist, premium feel. 
- **Alignment:** All content is center-aligned within the container, while product details within cards are left-aligned for rapid scanning.

## Elevation & Depth
Depth is expressed through **Ambient Shadows** and **Tonal Layering**. 

The design system avoids harsh borders. Instead, it uses a three-tier elevation system:
1. **Level 0 (Flat):** The main background (`#FFFFFF`).
2. **Level 1 (Subtle):** Product cards and search bars use a very soft, diffused shadow (Y: 4px, Blur: 20px, 4% Opacity of `#1F2937`) to lift them slightly from the canvas.
3. **Level 2 (Active):** Hovered cards or dropdown menus increase shadow spread and opacity (Y: 12px, Blur: 30px, 8% Opacity) to provide tactile feedback.

Floating elements like "Add to Cart" sticky bars on mobile use a subtle top-border (`#F9FAFB`) combined with a soft blur backdrop to indicate a separate functional plane.

## Shapes
The shape language is defined by a friendly but professional **Rounded** profile. 

- **Cards:** Use `rounded-xl` (1.5rem / 24px) to create a soft, modern frame for appliance imagery.
- **Buttons & Inputs:** Use `rounded-lg` (1rem / 16px) for a comfortable, approachable touch target.
- **Badges/Chips:** Use full pill-shaping (999px) for status indicators (e.g., "In Stock" or "Sale") to distinguish them from functional buttons.

## Components
- **Search Bar:** A wide, Level 1 elevation component with a `rounded-lg` corner radius. It features a subtle 1px border in Light Gray and the search icon in the Primary color for visual focus.
- **Product Cards:** Featured products occupy a Level 1 shadow state. Images should have a 1:1 aspect ratio with a slight gray background to ground the appliance. The Primary color is used for price points and "Quick Add" buttons.
- **Cart Badge:** A circular notification dot in the Primary color, positioned at the top-right of the secondary-colored cart icon.
- **Buttons:**
    - *Primary:* Solid Orange (`#FF6B35`) with white text.
    - *Secondary:* Ghost style with 1px Dark Gray border.
- **Navigation:** A sticky top bar with a glassmorphism effect (blur: 12px) on scroll. Links use `label-md` styling with an orange underline on active/hover states.
- **Input Fields:** Minimalist design using a `F9FAFB` fill and a subtle 1px stroke that turns Primary on focus.