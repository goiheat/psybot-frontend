const MONTHS_SHORT = [
  "янв",
  "фев",
  "мар",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

const MONTHS_FULL = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export function formatDateShort(d: Date) {
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}

export function formatDateLong(d: Date) {
  return `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatTime(d: Date) {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function formatPhone(raw: string) {
  // expects 10 digits after +7; masks middle as "···"
  const digits = raw.replace(/\D/g, "").slice(-10);
  const a = digits.slice(0, 3);
  const c = digits.slice(6, 8);
  const d = digits.slice(8, 10);
  return `+7 (${a}) ··· ${c}-${d}`;
}
