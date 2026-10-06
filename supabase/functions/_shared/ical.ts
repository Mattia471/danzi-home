export type IcalBlock = { uid: string; start_date: string; end_date: string };

function toDate(value: string) {
  const v = value.trim().replace(/;VALUE=DATE/g, '');
  const raw = v.includes(':') ? v.split(':').pop()! : v;
  if (/^\d{8}$/.test(raw)) return `${raw.slice(0,4)}-${raw.slice(4,6)}-${raw.slice(6,8)}`;
  if (/^\d{8}T/.test(raw)) return `${raw.slice(0,4)}-${raw.slice(4,6)}-${raw.slice(6,8)}`;
  return raw.slice(0,10);
}

export function parseIcal(ics: string): IcalBlock[] {
  const unfolded = ics.replace(/\r?\n[ \t]/g, '');
  return unfolded.split('BEGIN:VEVENT').slice(1).map((chunk, i) => {
    const uid = chunk.match(/\r?\nUID:(.+)/)?.[1]?.trim() || `airbnb-${i}`;
    const startLine = chunk.match(/\r?\nDTSTART[^\r\n]*/)?.[0] || '';
    const endLine = chunk.match(/\r?\nDTEND[^\r\n]*/)?.[0] || '';
    return { uid, start_date: toDate(startLine), end_date: toDate(endLine) };
  }).filter((x) => x.start_date && x.end_date && x.end_date > x.start_date);
}
