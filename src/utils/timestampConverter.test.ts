import { timestampConverterToGB } from "./timestampConverter";
import timestampConverter from "./timestampConverter";

// 1 Hour	3600 Seconds
// 1 Day	86400 Seconds
// 1 Week	604800 Seconds
// 1 Month (30.44 days)	2629743 Seconds
// 1 Year (365.24 days)	31556926 Seconds

test("returns a date in dd/mm/yyyy format", () => {
  expect(timestampConverterToGB(1642097960)).toBe("13/01/2022");
  expect(timestampConverterToGB(1638901160)).toBe("07/12/2021");
  expect(timestampConverterToGB(1625678360)).toBe("07/07/2021");
  expect(timestampConverterToGB(165)).toBe("15/04/2022");
  expect(timestampConverterToGB(1224)).toBe("14/10/2008");
});

test("returns a string relative to current time", () => {
  const now = new Date().getTime();
  expect(timestampConverter(now - 3600 * 1000).toLowerCase()).toBe(
    "an hour ago"
  );
  expect(timestampConverter(now - 86400 * 1000).toLowerCase()).toBe(
    "a day ago"
  );
  expect(timestampConverter(now - 604800 * 1000).toLowerCase()).toBe(
    "7 days ago"
  );
  expect(timestampConverter(now + 3600 * 1000).toLowerCase()).toBe(
    "in an hour"
  );
  expect(timestampConverter(now + 86400 * 1000).toLowerCase()).toBe("in a day");
});
