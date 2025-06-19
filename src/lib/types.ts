export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
  imageHint: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  stockStatus: 'In Stock' | 'Out of Stock';
  imageHint: string;
}

export interface Stylist {
  id: string;
  name: string;
  bio: string;
  specializations: string[];
  imageHint: string;
}

export interface GalleryImage {
  id: string;
  alt: string;
  category: 'Recent Work' | 'Salon Interior' | 'Team Members';
  imageHint: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

export interface Booking {
  id: string;
  serviceName: string;
  clientName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}
