import { EngineType } from "./EngineType";
import { LegalStatus } from "./LegalStatus";
import { PhysicalStatus } from "./PhysicalStatus";
import { SellingStatus } from "./SellingStatus";
import { FinancialDetails } from "./FinancialDetails";

export type CarInput = {
  id: string;
  make: string;
  model: string;
  trim: string;
  engineType: EngineType | "";
  physicalStatus: PhysicalStatus | "";
  legalStatus: LegalStatus | "";
  sellingStatus: SellingStatus | "";
};

export type Car = CarInput & {
  financialDetails: FinancialDetails;
};
