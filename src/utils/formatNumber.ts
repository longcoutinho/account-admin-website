import numeral from "numeral";

export function fCurrency(number: any) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

export function fPercent(number: any) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number: any) {
  return numeral(number).format();
}

export function fShortenNumber(number: any) {
  return numeral(number).format("0.00a").replace(".00", "");
}

export function fData(number: any) {
  return numeral(number).format("0.0 b");
}
export const formatId = (id: string) => {
  const _stringDel = id?.substring(6, id.length - 6);
  return id?.replace(_stringDel, "...");
};
