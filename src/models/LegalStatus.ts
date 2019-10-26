import { EnumDisplayType } from "./EnumDisplayType";

enum LegalStatus {
  OWNER = "OWNER",
  US = "US",
  BUYER = "BUYER"
}

const LegalStatusDisplay: EnumDisplayType = {};
LegalStatusDisplay[LegalStatus.OWNER] = "Owner";
LegalStatusDisplay[LegalStatus.US] = "Us";
LegalStatusDisplay[LegalStatus.BUYER] = "Buyer";

export { LegalStatusDisplay, LegalStatus };
