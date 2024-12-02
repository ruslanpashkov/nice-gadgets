export interface FontSize {
  fontSize: string;
}

const FONT_SIZES = {
  LARGE: '0.80rem',
  MEDIUM: '0.675rem',
  SMALL: '0.55rem',
} as const;

const THRESHOLDS = {
  DOUBLE_DIGIT: 9,
  TRIPLE_DIGIT: 99,
} as const;

export function getFontSize(count: number) {
  if (count > THRESHOLDS.TRIPLE_DIGIT) {
    return FONT_SIZES.SMALL;
  }

  if (count > THRESHOLDS.DOUBLE_DIGIT) {
    return FONT_SIZES.MEDIUM;
  }

  return FONT_SIZES.LARGE;
}
