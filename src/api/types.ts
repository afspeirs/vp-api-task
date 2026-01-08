/**
 * NOTE: These types were made just to help me make this task quicker.
 * They are probably not accurate, but should do for making this task
 */

export type ResponsePagination = {
  from: number,
  size: number,
  total: number,
  sortType: number,
};

export type ResponseFacet = {
  identifier: string,
  displayName: string,
  priority: number,
  "options": {
    "identifier": string,
    "value": string | {
      "gte": number,
      "lte": number,
    },
    "displayValue": string,
    "productCount": number,
    "priority": number,
  }[],
  "facetType": number,
};

export type ResponseProduct = {
  id: `${string}:${string}-${string}`,
  legacyId: string,
  legacyVariantId: string,
  cultureCode: string,
  isDefaultVariant: boolean,
  sku: string,
  productName: string,
  slug: string,
  reviewsCount: number,
  questionsCount: number,
  image: {
    externalId: string,
    url: string,
    priority: number,
    isDefault: boolean,
    attributes: {
      imageAltText: string,
    },
  },
  stockStatus: {
    status: string,
  },
  price: {
    "currencyCode": string,
    "priceIncTax": number,
    "priceExcTax": number,
    "isOnPromotion": boolean,
  },
  attributes: { string: string },
  defaultCategory: {
    externalId: `${string}:${string}-${string}`,
    slug: string,
    name: string,
    isDefault: boolean,
    ancestors: {
      slug: string,
      externalId: `${string}:${string}-${string}`,
      name: string,
      depth: number,
    }[],
  },
  brand: {
    externalId: `${string}:${string}-${string}`,
    slug: string,
    name: string,
    brandImage: {
      externalId: string,
      url: string,
      priority: number,
      isDefault: boolean,
      attributes: {
        "imageAltText": string,
      },
    },
  },
  "score": number
};

export type ApiResponse = {
  pagination: ResponsePagination,
  facets: ResponseFacet[],
  products: ResponseProduct[],
}
