import { v4 as uuidv4 } from "uuid";

export function generateTicketId() {
  return `IOT-${uuidv4().slice(0, 8).toUpperCase()}`;
}