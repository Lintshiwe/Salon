import type { Service, Product, Stylist, GalleryImage } from '@/lib/types';

export const services: Service[] = [
  { id: '1', name: 'Signature Haircut & Style', description: 'A personalized cut and style to perfectly suit you.', price: '$75+', duration: '60 mins', imageHint: 'haircut styling' },
  { id: '2', name: 'Luxury Manicure', description: 'Indulge in a pampering manicure with premium products.', price: '$50', duration: '45 mins', imageHint: 'manicure hands' },
  { id: '3', name: 'Rejuvenating Facial', description: 'Customized facial treatment to refresh and revitalize your skin.', price: '$120', duration: '75 mins', imageHint: 'facial spa' },
  { id: '4', name: 'Glamour Makeup Application', description: 'Full makeup for special occasions or a night out.', price: '$90', duration: '60 mins', imageHint: 'makeup beauty' },
  { id: '5', name: 'Deluxe Pedicure', description: 'Relax with a soothing pedicure, including massage and polish.', price: '$65', duration: '60 mins', imageHint: 'pedicure feet' },
  { id: '6', name: 'Hair Coloring', description: 'From subtle highlights to bold new colors, expertly applied.', price: '$150+', duration: '120 mins', imageHint: 'hair color' },
];

export const products: Product[] = [
  { id: 'p1', name: 'Sparkle Shine Shampoo', description: 'Leaves your hair dazzlingly clean and shiny.', price: '$28', category: 'Hair Care', imageHint: 'shampoo bottle' },
  { id: 'p2', name: 'Velvet Smooth Conditioner', description: 'Nourishes and detangles for silky smooth hair.', price: '$30', category: 'Hair Care', imageHint: 'conditioner bottle' },
  { id: 'p3', name: 'Dream Hold Hair Spray', description: 'Keeps your style in place all day with a touchable hold.', price: '$25', category: 'Styling', imageHint: 'hairspray can' },
  { id: 'p4', name: 'Princess Pink Nail Polish', description: 'The perfect shade of Barbie pink for your nails.', price: '$18', category: 'Nails', imageHint: 'nail-polish bottle' },
  { id: 'p5', name: 'Glow Up Face Serum', description: 'A magical serum for radiant, youthful skin.', price: '$55', category: 'Skin Care', imageHint: 'serum skincare' },
  { id: 'p6', name: 'Diamond Dust Body Lotion', description: 'Hydrating lotion with a subtle shimmer.', price: '$40', category: 'Body Care', imageHint: 'lotion bottle' },
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
