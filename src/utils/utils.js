export function generateTicketCode() {
  return 'TCK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}
