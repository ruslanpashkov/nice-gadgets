import { ProductInfo, ProductType } from '../types/Product';

const PRODUCT_FIELDS: Record<ProductType, (keyof ProductInfo)[]> = {
  phones: [
    'screen',
    'resolution',
    'processor',
    'ram',
    'camera',
    'zoom',
    'cell',
  ],
  tablets: [
    'screen',
    'resolution',
    'processor',
    'ram',
    'camera',
    'zoom',
    'cell',
  ],
  accessories: ['screen', 'resolution', 'processor', 'ram', 'cell'],
} as const;

export function getValidFields(category: ProductType): (keyof ProductInfo)[] {
  return PRODUCT_FIELDS[category];
}
