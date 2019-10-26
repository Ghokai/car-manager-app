import { EnumDisplayType } from "./EnumDisplayType";

enum SellingStatus {
  AVAILABLE = "AVAILABLE",
  PENDING = "PENDING",
  SOLD = "SOLD",
  RESERVED = "RESERVED"
}

const SellingStatusDisplay: EnumDisplayType = {};
SellingStatusDisplay[SellingStatus.AVAILABLE] = "Available";
SellingStatusDisplay[SellingStatus.PENDING] = "Pending";
SellingStatusDisplay[SellingStatus.SOLD] = "Sold";
SellingStatusDisplay[SellingStatus.RESERVED] = "Reserved";

export { SellingStatusDisplay, SellingStatus };
