import { addDays, differenceInCalendarDays, format, isFriday, isSaturday, parseISO } from 'date-fns';

export type DemoSearchParams = {
  checkIn: string;
  checkOut: string;
  guests: number;
};

export type DemoGuestData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
};

export type DemoQuote = {
  nights: number;
  accommodationTotal: number;
  cleaningFee: number;
  discount: number;
  total: number;
  averageNightlyRate: number;
};

export type DemoBooking = DemoSearchParams & DemoGuestData & DemoQuote & {
  id: string;
  code: string;
  createdAt: string;
};

type DemoBlockedRange = {
  checkIn: string;
  checkOut: string;
  label: string;
};

const STORAGE_KEY = 'danzi-house-demo-bookings';

function date(value: Date) {
  return format(value, 'yyyy-MM-dd');
}

function getSeededBlocks(): DemoBlockedRange[] {
  const today = new Date();
  return [
    {
      checkIn: date(addDays(today, 5)),
      checkOut: date(addDays(today, 8)),
      label: 'Prenotazione da portale',
    },
    {
      checkIn: date(addDays(today, 14)),
      checkOut: date(addDays(today, 18)),
      label: 'Prenotazione diretta',
    },
    {
      checkIn: date(addDays(today, 27)),
      checkOut: date(addDays(today, 30)),
      label: 'Blocco calendario',
    },
  ];
}

export function getDemoBookings(): DemoBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as DemoBooking[] : [];
  } catch {
    return [];
  }
}

export function getDemoBlockedRanges(): DemoBlockedRange[] {
  const created = getDemoBookings().map((booking) => ({
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    label: `Demo ${booking.code}`,
  }));
  return [...getSeededBlocks(), ...created];
}

function overlaps(checkIn: string, checkOut: string, block: DemoBlockedRange) {
  return checkIn < block.checkOut && checkOut > block.checkIn;
}

export function calculateDemoQuote(params: DemoSearchParams): DemoQuote {
  const start = parseISO(params.checkIn);
  const end = parseISO(params.checkOut);
  const nights = Math.max(0, differenceInCalendarDays(end, start));

  let accommodationTotal = 0;
  for (let i = 0; i < nights; i += 1) {
    const current = addDays(start, i);
    accommodationTotal += isFriday(current) || isSaturday(current) ? 118 : 98;
  }

  const discountRate = nights >= 14 ? 0.12 : nights >= 7 ? 0.08 : 0;
  const discount = Math.round(accommodationTotal * discountRate);
  const cleaningFee = 35;
  const total = accommodationTotal - discount + cleaningFee;

  return {
    nights,
    accommodationTotal,
    cleaningFee,
    discount,
    total,
    averageNightlyRate: nights ? Math.round(accommodationTotal / nights) : 0,
  };
}

export function searchDemoAvailability(params: DemoSearchParams) {
  const conflict = getDemoBlockedRanges().find((block) => overlaps(params.checkIn, params.checkOut, block));

  if (conflict) {
    return {
      available: false as const,
      conflict,
    };
  }

  return {
    available: true as const,
    quote: calculateDemoQuote(params),
  };
}

export function createDemoBooking(params: DemoSearchParams, guest: DemoGuestData, quote: DemoQuote): DemoBooking {
  const booking: DemoBooking = {
    ...params,
    ...guest,
    ...quote,
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    code: `DZH-${String(Date.now()).slice(-6)}`,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...getDemoBookings(), booking]));
  }

  return booking;
}

export function resetDemoBookings() {
  if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY);
}
