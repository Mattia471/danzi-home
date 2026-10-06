export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type BookingSource = 'website' | 'airbnb' | 'manual';

export type BookingRequest = {
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  privacyAccepted: boolean;
};

export type CalendarBlock = {
  id: string;
  source: BookingSource;
  start_date: string;
  end_date: string;
  type: string;
};
