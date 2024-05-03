export function formatDateTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);

  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

export function formatDateToId() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}
