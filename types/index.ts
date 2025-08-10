export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  dateJoined: Date;
  totalSpent: number;
  notes?: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'fish' | 'reptile' | 'small-animal' | 'other';
  breed: string;
  age: number;
  weight: number;
  color: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  microchipId?: string;
  medicalHistory: MedicalRecord[];
  vaccinations: Vaccination[];
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  date: Date;
  veterinarian: string;
  diagnosis: string;
  treatment: string;
  medications?: string[];
  cost: number;
  notes?: string;
}

export interface Vaccination {
  id: string;
  petId: string;
  vaccineName: string;
  dateAdministered: Date;
  nextDueDate: Date;
  veterinarian: string;
  batchNumber?: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  petId: string;
  date: Date;
  time: string;
  service: string;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  cost?: number;
  veterinarian?: string;
}

export interface Sale {
  id: string;
  customerId: string;
  date: Date;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'credit' | 'debit' | 'check';
  status: 'pending' | 'completed' | 'refunded';
}

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'food' | 'toys' | 'accessories' | 'medicine' | 'grooming' | 'other';
  brand: string;
  description: string;
  price: number;
  cost: number;
  stockQuantity: number;
  minStockLevel: number;
  supplier: string;
  sku: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalCustomers: number;
  totalPets: number;
  todayAppointments: number;
  monthlyRevenue: number;
  lowStockItems: number;
  recentSales: Sale[];
  upcomingAppointments: Appointment[];
}