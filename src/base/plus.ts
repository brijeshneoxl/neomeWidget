import {CSSProperties} from "preact/compat";
import {EnumDefnPosition} from "./types.ts";
import {neomeFrameSrc} from "./types.ts";
import {IWidgetScriptConfig} from "./types.ts";

export function getPath(config?: IWidgetScriptConfig)
{
  const filterEntIds = [];
  if(config?.filterEntId)
  {
    filterEntIds.push(config.filterEntId);
  }
  if(config?.allowPersonalChat)
  {
    filterEntIds.push("global");
  }

  return `${neomeFrameSrc}${filterEntIds.length ? ("?entIds=" + filterEntIds.join(",")) : ""}`;
}

export function getPositionStyle(
  buttonPosition?: EnumDefnPosition,
  position1?: string,
  position2?: string
): CSSProperties
{
  switch(buttonPosition)
  {
    case "topLeft":
      return {
        top: position1,
        left: position2,
        boxShadow: "-5px -5px 10px -10px rgba(0, 0, 0, 0.3)"
      };
    case "topRight":
      return {
        top: position1,
        right: position2,
        boxShadow: "5px -5px 10px -10px rgba(0, 0, 0, 0.3)"
      };
    case "bottomLeft":
      return {
        bottom: position1,
        left: position2,
        boxShadow: "-5px 5px 10px -10px rgba(0, 0, 0, 0.3)"
      };
    case "bottomRight":
    default:
      return {
        bottom: position1,
        right: position2,
        boxShadow: "5px 5px 10px -10px rgba(0, 0, 0, 0.3)"
      };
  }
}
