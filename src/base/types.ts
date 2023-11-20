export const neomeWidgetFloating = "neomeWidgetFloating";
export const neomeWidgetEmbed = ".neomeWidgetEmbed";
export const neomeWidgetBtnId = "neomeWidgetBtnId";
export const neomeFrameContainerId = "neomeFrameContainerId";
export const neomeFrameId = "neomeFrameId";
export const neomeFrameSrc = "https://web.orgbeat.com";

export const minWidgetWidth = 280;
export const minWidgetHeight = 400;

type IPostMsgType =
  | "connected"
  | "disconnected"
  | "badge";

type IGetMsgType = "init" | "terminate";
type TypeWidget = "floating" | "embed";

export interface IGetMsgPayload
{
  type: IGetMsgType,
  payload: any
}

export interface IPostMsgResponse
{
  type: IPostMsgType,
  payload: number
}

export type EnumDefnPosition =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

export interface IWidgetButtonConfig
{
  floatingButtonIconSrc?: string;
  floatingButtonPosition?: EnumDefnPosition;
  onOpenHideWidgetButton?: boolean;
  disableBadgeCount?: boolean;
  widgetWidth?: number;
  widgetHeight?: number;
  widgetMargin?: number;
}

export interface IWidgetScriptConfig extends IWidgetButtonConfig
{
  showAs: TypeWidget;
  filterEntId?: string;
  allowPersonalChat?: boolean;
  userEmailId?: string;
  userPassword?: string;
  showStore?: boolean;
  showStudio?: boolean;
  showTerminal?: boolean;
  showProduction?: boolean;
}
