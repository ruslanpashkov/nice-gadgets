'use strict';

import { Request, Response } from 'express';
import { Capacity } from './models/Capacity.model';
import { Description } from './models/Description.model';
import { ImagesColor } from './models/ImagesColor.model';
import { Product } from './models/Product.model';

export type Controller = (req: Request, res: Response) => void;

export interface FullProduct {
  product: Product | null;
  imagesColor: ImagesColor[];
  capacities: Capacity[];
  descriptions: Description[];
  colors: ImagesColor[];
}

export interface ProductOrder {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
