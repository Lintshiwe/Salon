
export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
  imageHint: string;
  imageFile?: File; 
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  stockStatus: 'In Stock' | 'Out of Stock';
  imageHint: string;
  imageFile?: File;
}

export interface Stylist {
  id: string;
  name: string;
  bio: string;
  specializations: string[];
  imageHint: string;
  imageFile?: File;
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

// For Server Action responses
export interface ActionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
  fieldValues?: Record<string, string>;
}

export type PromotedItemIdentifier = {
  id: string;
  type: 'service' | 'product';
  discountPercentage?: number;
};
