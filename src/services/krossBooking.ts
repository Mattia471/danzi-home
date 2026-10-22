export type KrossSearchParams = {
  checkIn: string;
  checkOut: string;
  guests: number;
};

const getEnv = (key: string) => String(import.meta.env[key] ?? '').trim();

export const krossBookingConfig = {
  bookingUrl: getEnv('VITE_KROSS_BOOKING_URL'),
  propertyId: getEnv('VITE_KROSS_PROPERTY_ID'),
  demoMode: getEnv('VITE_KROSS_DEMO_MODE').toLowerCase() !== 'false',
  checkInParam: getEnv('VITE_KROSS_CHECKIN_PARAM') || 'checkin',
  checkOutParam: getEnv('VITE_KROSS_CHECKOUT_PARAM') || 'checkout',
  guestsParam: getEnv('VITE_KROSS_GUESTS_PARAM') || 'adults',
  propertyParam: getEnv('VITE_KROSS_PROPERTY_PARAM') || 'property_id',
};

export function isKrossBookingConfigured() {
  return Boolean(krossBookingConfig.bookingUrl);
}

export function isKrossDemoMode() {
  return krossBookingConfig.demoMode;
}

export function buildKrossBookingUrl(params: KrossSearchParams) {
  if (!krossBookingConfig.bookingUrl) return null;

  try {
    const url = new URL(krossBookingConfig.bookingUrl);
    url.searchParams.set(krossBookingConfig.checkInParam, params.checkIn);
    url.searchParams.set(krossBookingConfig.checkOutParam, params.checkOut);
    url.searchParams.set(krossBookingConfig.guestsParam, String(params.guests));

    if (krossBookingConfig.propertyId) {
      url.searchParams.set(krossBookingConfig.propertyParam, krossBookingConfig.propertyId);
    }

    return url.toString();
  } catch {
    return null;
  }
}
