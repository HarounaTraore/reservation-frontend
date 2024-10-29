// useDateTimeFormatter.js
import moment from "moment";

export function useDateTimeFormatter() {
  const formatDateTime = (datetime, format = "YYYY-MM-DD") => {
    return datetime ? moment(datetime).format(format) : "";
  };

  return { formatDateTime };
}

