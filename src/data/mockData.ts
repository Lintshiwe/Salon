import type { Service, Product, Stylist, GalleryImage, Booking, PromotedItemIdentifier } from '@/lib/types';

export let services: Service[] = [];

export let products: Product[] = [
  { id: 'p1', name: 'Lavender Dreams Candle', description: 'Hand-poured soy candle with calming lavender scent for relaxation.', price: 'R280', category: 'Candles', stockStatus: 'In Stock', imageHint: 'lavender candle' },
  { id: 'p2', name: 'Vanilla Bliss Diffuser', description: 'Premium reed diffuser with warm vanilla fragrance for your home.', price: 'R350', category: 'Diffusers', stockStatus: 'In Stock', imageHint: 'vanilla diffuser' },
  { id: 'p3', name: 'Rose Garden Soap Bar', description: 'Luxurious handmade soap with rose petals and moisturizing oils.', price: 'R120', category: 'Soaps', stockStatus: 'Out of Stock', imageHint: 'rose soap bar' },
  { id: 'p4', name: 'Citrus Burst Candle', description: 'Energizing citrus scented candle to brighten your day.', price: 'R260', category: 'Candles', stockStatus: 'In Stock', imageHint: 'citrus candle' },
  { id: 'p5', name: 'Eucalyptus Mint Diffuser', description: 'Refreshing eucalyptus and mint blend for a spa-like atmosphere.', price: 'R380', category: 'Diffusers', stockStatus: 'In Stock', imageHint: 'eucalyptus diffuser' },
  { id: 'p6', name: 'Honey Oat Soap', description: 'Gentle exfoliating soap with natural honey and oats.', price: 'R140', category: 'Soaps', stockStatus: 'In Stock', imageHint: 'honey oat soap' },
  { id: 'p7', name: 'Jasmine Night Candle', description: 'Romantic jasmine scented candle perfect for evening relaxation.', price: 'R300', category: 'Candles', stockStatus: 'In Stock', imageHint: 'jasmine candle' },
  { id: 'p8', name: 'Ocean Breeze Diffuser', description: 'Fresh ocean scent that brings the seaside to your home.', price: 'R320', category: 'Diffusers', stockStatus: 'Out of Stock', imageHint: 'ocean diffuser' },
  { id: 'p9', name: 'Shea Butter Luxury Soap', description: 'Ultra-moisturizing soap enriched with pure shea butter.', price: 'R160', category: 'Soaps', stockStatus: 'In Stock', imageHint: 'shea butter soap' },
];

export let stylists: Stylist[] = [];

export let galleryImages: GalleryImage[] = [
  { id: 'g1', alt: 'Beautiful candle display with various scents', category: 'Recent Work', imageHint: 'candle display' },
  { id: 'g2', alt: 'Elegant diffuser arrangement', category: 'Recent Work', imageHint: 'diffuser arrangement' },
  { id: 'g3', alt: 'Handcrafted soap collection', category: 'Recent Work', imageHint: 'soap collection' },
  { id: 'g4', alt: 'Cozy shop interior with pink accents', category: 'Shop Interior', imageHint: 'shop interior' },
  { id: 'g5', alt: 'Product display shelves', category: 'Shop Interior', imageHint: 'product shelves' },
  { id: 'g6', alt: 'Welcoming entrance area', category: 'Shop Interior', imageHint: 'shop entrance' },
  { id: 'g7', alt: 'Candle making process', category: 'Behind the Scenes', imageHint: 'candle making' },
  { id: 'g8', alt: 'Soap crafting workspace', category: 'Behind the Scenes', imageHint: 'soap making' },
  { id: 'g9', alt: 'Gift packaging and presentation', category: 'Recent Work', imageHint: 'gift packaging' },
];

export let bookings: Booking[] = [];

export let promotedItems: PromotedItemIdentifier[] = [
    { id: products[0].id, type: 'product', discountPercentage: 20 }, 
    { id: products[1].id, type: 'product', discountPercentage: 15 }, 
    { id: products[3].id, type: 'product', discountPercentage: 25 },
    { id: products[6].id, type: 'product', discountPercentage: 10 },
];

// In-memory store for the homepage hero image
let currentHeroImageSrc: string | null = null;

export function getHeroImageSrc(): string | null {
  return currentHeroImageSrc;
}

export function setHeroImageSrc(src: string | null): void {
  currentHeroImageSrc = src;
}