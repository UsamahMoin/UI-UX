# Streetwear artwork and typography

## Current direction

The current Common Ground example follows the user-provided fashion storefront reference: a centered serif wordmark, a compact material banner, and three flush studio portraits. It uses the existing original `streetwear-lookbook.png` triptych and `streetwear.png` material and product imagery. Shared core copy and the color studio are preserved. Rubik Distressed remains available in the teaching typeface selector, while the default storefront uses plain sans-serif text and a bold serif wordmark.

## Earlier zine exploration

Generated with the built-in image-generation tool for the stronger grunge direction.

Saved asset: `public/images/design-foundations/streetwear-punk.png`.

Art-direction brief supplied to the image-generation agent:

> Triptych 3:1 exactly three square panels flush: three individual fully clothed adult punk/skate looks from the same black/gray distressed collection against rough urban walls, hard direct flash, unposed angular attitude, high contrast monochrome editorial gritty analog grain, no text/logos.

The three panels are framed independently in CSS for the hero collage, lookbook, and detail viewer. The existing generated xerox texture remains at `public/images/design-foundations/grunge-texture.png`.

## Display typography

The earlier zine exploration used [Rubik Distressed](https://fonts.google.com/specimen/Rubik+Distressed) for its wordmark and large headings. The worn letterforms complement the photocopied imagery; navigation and body copy retain plain text faces. The experiment selector also exposes this family to other directions.

The Latin WOFF2 is bundled locally in `app/design-lab/fonts/RubikDistressed-Latin.woff2`, served through the build's asset pipeline for both hosting targets. The accompanying `RubikDistressed-OFL.txt` preserves the SIL Open Font License from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/rubikdistressed). No runtime Google Fonts request is needed for this face.
