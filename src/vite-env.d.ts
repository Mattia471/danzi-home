/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_KROSS_BOOKING_URL?: string;
  readonly VITE_KROSS_PROPERTY_ID?: string;
  readonly VITE_KROSS_DEMO_MODE?: string;
  readonly VITE_KROSS_CHECKIN_PARAM?: string;
  readonly VITE_KROSS_CHECKOUT_PARAM?: string;
  readonly VITE_KROSS_GUESTS_PARAM?: string;
  readonly VITE_KROSS_PROPERTY_PARAM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
