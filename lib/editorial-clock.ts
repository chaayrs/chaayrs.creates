export type EditorialTime = { digits: string; period: string; text: string };

export function formatEditorialTime(
  date: Date,
  timeZone: string,
): EditorialTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")!.value;
  const minute = parts.find((part) => part.type === "minute")!.value;
  const period = parts.find((part) => part.type === "dayPeriod")!.value;
  const digits = `${hour}:${minute}`;
  return { digits, period, text: `${digits} ${period}` };
}

export function editorialTimes(date: Date, visitorZone: string) {
  return {
    manila: formatEditorialTime(date, "Asia/Manila"),
    visitor: formatEditorialTime(date, visitorZone),
  };
}
