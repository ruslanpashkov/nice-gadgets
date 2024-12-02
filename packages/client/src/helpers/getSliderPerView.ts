const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1200,
} as const;

const SLIDES = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
  LARGE: 4,
} as const;

export function getSlidesPerView(width: number): number {
  if (width < BREAKPOINTS.MOBILE) {
    return SLIDES.MOBILE;
  }

  if (width < BREAKPOINTS.TABLET) {
    return SLIDES.TABLET;
  }

  if (width < BREAKPOINTS.DESKTOP) {
    return SLIDES.DESKTOP;
  }

  return SLIDES.LARGE;
}
