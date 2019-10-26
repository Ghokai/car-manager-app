import { EnumDisplayType } from "./EnumDisplayType";

enum PhysicalStatus {
  AT_OWNER = "AT_OWNER",
  AT_BUYER = "AT_BUYER",
  AT_OUR_LOCATION = "AT_OUR_LOCATION"
}

const PhysicalStatusDisplay: EnumDisplayType = {};
PhysicalStatusDisplay[PhysicalStatus.AT_OWNER] = "At Owner";
PhysicalStatusDisplay[PhysicalStatus.AT_BUYER] = "At Buyer";
PhysicalStatusDisplay[PhysicalStatus.AT_OUR_LOCATION] = "At Our Location";

export { PhysicalStatusDisplay, PhysicalStatus };
