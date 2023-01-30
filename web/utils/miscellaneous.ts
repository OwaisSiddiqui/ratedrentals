export const dateDifferenceInDays = (start: string, end: string) => {
  const diffInMs = new Date(end).valueOf() - new Date(start).valueOf()
  return diffInMs / (1000 * 60 * 60 * 24)
}

export const isNumeric = (string: string) => {
  return (
    !isNaN(Number(string)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(string))
  ) // ...and ensure strings of whitespace fail
}

export const toSlug = (string: string) => {
  return string
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export const toUpperCaseFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

type Ranges = Exclude<Intl.RelativeTimeFormatUnit, "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "quarter" | "quarters">

export const timeAgo = (input: any) => {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges: {[key in Ranges]: number} = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let keyLoop in ranges) {
    const key = keyLoop as Ranges
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}