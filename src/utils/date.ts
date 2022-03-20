import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (
  timeString: string,
  format: string = "YYYY年M月D日",
) => {
  return dayjs.utc(timeString).tz("Asia/Tokyo").format(format);
};
