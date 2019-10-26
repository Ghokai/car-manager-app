import { EnumDisplayType } from "./EnumDisplayType";

enum EngineType {
  VEE = "VEE",
  INLINE = "INLINE",
  BOXER = "BOXER",
  ROTARY = "ROTARY"
}

const EngineTypeDisplay: EnumDisplayType = {};
EngineTypeDisplay[EngineType.VEE] = "Vee";
EngineTypeDisplay[EngineType.INLINE] = "Inline";
EngineTypeDisplay[EngineType.BOXER] = "Boxer";
EngineTypeDisplay[EngineType.ROTARY] = "Rotary";

export { EngineTypeDisplay, EngineType };
