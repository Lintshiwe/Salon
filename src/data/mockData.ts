
import type { Service, Product, Stylist, GalleryImage, Booking, PromotedItemIdentifier } from '@/lib/types';

export let services: Service[] = [
  { id: '1', name: 'Signature Haircut & Style', description: 'A personalized cut and style to perfectly suit you.', price: 'R750+', duration: '60 mins', imageHint: 'haircut styling' },
  { id: '2', name: 'Luxury Manicure', description: 'Indulge in a pampering manicure with premium products.', price: 'R500', duration: '45 mins', imageHint: 'manicure hands' },
  { id: '3', name: 'Rejuvenating Facial', description: 'Customized facial treatment to refresh and revitalize your skin.', price: 'R1200', duration: '75 mins', imageHint: 'facial spa' },
  { id: '4', name: 'Glamour Makeup Application', description: 'Full makeup for special occasions or a night out.', price: 'R900', duration: '60 mins', imageHint: 'makeup beauty' },
  { id: '5', name: 'Deluxe Pedicure', description: 'Relax with a soothing pedicure, including massage and polish.', price: 'R650', duration: '60 mins', imageHint: 'pedicure feet' },
  { id: '6', name: 'Hair Coloring', description: 'From subtle highlights to bold new colors, expertly applied.', price: 'R1500+', duration: '120 mins', imageHint: 'hair color' },
];

export let products: Product[] = [
  { id: 'p1', name: 'Sparkle Shine Shampoo', description: 'Leaves your hair dazzlingly clean and shiny.', price: 'R280', category: 'Hair Care', stockStatus: 'In Stock', imageHint: 'shampoo bottle' },
  { id: 'p2', name: 'Velvet Smooth Conditioner', description: 'Nourishes and detangles for silky smooth hair.', price: 'R300', category: 'Hair Care', stockStatus: 'In Stock', imageHint: 'conditioner bottle' },
  { id: 'p3', name: 'Dream Hold Hair Spray', description: 'Keeps your style in place all day with a touchable hold.', price: 'R250', category: 'Styling', stockStatus: 'Out of Stock', imageHint: 'hairspray can' },
  { id: 'p4', name: 'Princess Pink Nail Polish', description: 'The perfect shade of Barbie pink for your nails.', price: 'R180', category: 'Nails', stockStatus: 'In Stock', imageHint: 'nail-polish bottle' },
  { id: 'p5', name: 'Glow Up Face Serum', description: 'A magical serum for radiant, youthful skin.', price: 'R550', category: 'Skin Care', stockStatus: 'In Stock', imageHint: 'serum skincare' },
  { id: 'p6', name: 'Diamond Dust Body Lotion', description: 'Hydrating lotion with a subtle shimmer.', price: 'R400', category: 'Body Care', stockStatus: 'Out of Stock', imageHint: 'lotion bottle' },
];

export const stylists: Stylist[] = [
  { id: 's1', name: 'Bella Sparkle', bio: 'Bella brings a touch of magic to every hairstyle. With 10 years of experience, she specializes in creative coloring and glamorous updos.', specializations: ['Creative Coloring', 'Updos', 'Bridal Hair'], imageHint: 'hairstylist portrait' },
  { id: 's2', name: 'Ken Dazzle', bio: 'Ken is a master of precision cuts and modern styling. He loves transforming looks and making clients feel their absolute best.', specializations: ['Precision Cuts', 'Men\'s Grooming', 'Modern Styles'], imageHint: 'male stylist' },
  { id: 's3', name: 'Daisy Glam', bio: 'Daisy is passionate about skincare and makeup. Her facials are legendary, and she can create the perfect makeup look for any occasion.', specializations: ['Luxury Facials', 'Makeup Artistry', 'Brow Shaping'], imageHint: 'makeup-artist smile' },
];

export const galleryImages: GalleryImage[] = [
  { id: 'g1', alt: 'Stunning blonde balayage', category: 'Recent Work', imageHint: 'blonde balayage' },
  { id: 'g2', alt: 'Elegant bridal updo', category: 'Recent Work', imageHint: 'bridal updo' },
  { id: 'g3', alt: 'Vibrant pink hair color', category: 'Recent Work', imageHint: 'pink hair' },
  { id: 'g4', alt: 'Chic salon interior with pink accents', category: 'Salon Interior', imageHint: 'salon interior' },
  { id: 'g5', alt: 'Comfortable styling stations', category: 'Salon Interior', imageHint: 'styling station' },
  { id: 'g6', alt: 'Welcoming reception area', category: 'Salon Interior', imageHint: 'salon reception' },
  { id: 'g7', alt: 'The Born@Beautiful Team smiling', category: 'Team Members', imageHint: 'salon team' },
  { id: 'g8', alt: 'Stylist performing a haircut', category: 'Team Members', imageHint: 'stylist working' },
  { id: 'g9', alt: 'Close up of intricate nail art', category: 'Recent Work', imageHint: 'nail art' },
];

export const bookings: Booking[] = [
  { id: 'b1', serviceName: 'Signature Haircut & Style', clientName: 'Barbie Malibu', date: '2024-07-15', time: '10:00 AM', status: 'Confirmed' },
  { id: 'b2', serviceName: 'Luxury Manicure', clientName: 'Skipper Roberts', date: '2024-07-16', time: '02:00 PM', status: 'Pending' },
  { id: 'b3', serviceName: 'Rejuvenating Facial', clientName: 'Midge Hadley', date: '2024-07-18', time: '11:30 AM', status: 'Completed' },
  { id: 'b4', serviceName: 'Glamour Makeup Application', clientName: 'Teresa Rivera', date: '2024-07-20', time: '01:00 PM', status: 'Confirmed' },
  { id: 'b5', serviceName: 'Deluxe Pedicure', clientName: 'Raquelle', date: '2024-07-22', time: '03:30 PM', status: 'Cancelled' },
];

export let promotedItems: PromotedItemIdentifier[] = [
    { id: services[0].id, type: 'service' }, 
    { id: products[0].id, type: 'product' }, 
    { id: services[2].id, type: 'service' }, 
    { id: products[3].id, type: 'product' },
];

// In-memory store for the homepage hero image
let currentHeroImageSrc: string | null = null;

export function getHeroImageSrc(): string | null {
  return currentHeroImageSrc;
}

export function setHeroImageSrc(src: string | null): void {
  currentHeroImageSrc = src;
}
