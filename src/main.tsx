import {render} from "preact";
import {styles} from "./base/styles.ts";
import {neomeWidgetEmbed} from "./base/types.ts";
import {minWidgetHeight} from "./base/types.ts";
import {minWidgetWidth} from "./base/types.ts";
import {neomeWidgetFloating} from "./base/types.ts";
import {IWidgetScriptConfig} from "./base/types.ts";
import "./index.css";
import {Widget} from "./Widget.tsx";
import {RenderWidgetElement} from "./WidgetElement.tsx";

export default function load()
{
  const currentScript = document.currentScript;
  const config = currentScript?.getAttribute("config");
  const configObj = config
    ? JSON.parse(config) as IWidgetScriptConfig
    : undefined;

  const embedWidgetEvent = "embedWidget";

  const doLoad = (element: Element) =>
  {
    const neomeWidgetStyle = getComputedStyle(element);
    const showGif = Boolean(parseInt(neomeWidgetStyle.width, 10) < minWidgetWidth
      || parseInt(neomeWidgetStyle.height, 10) < minWidgetHeight);

    render(<RenderWidgetElement
      config={configObj}
      showGif={showGif}
    />, element);
  };

  if(configObj?.showAs === "embed")
  {
    const event = new CustomEvent(embedWidgetEvent);
    document.addEventListener(embedWidgetEvent, (evt) =>
    {
      const neomeWidgets = document.querySelectorAll(neomeWidgetEmbed);
      if(neomeWidgets.length > 0)
      {
        neomeWidgets.forEach((neomeWidget) =>
        {
          doLoad(neomeWidget);
        });
      }
    });
    const neomeWidgets = document.querySelectorAll(neomeWidgetEmbed);
    if(neomeWidgets.length > 0)
    {
      neomeWidgets.forEach((neomeWidget) =>
      {
        doLoad(neomeWidget);
      });
    }

    // @ts-ignore
    window[embedWidgetEvent] = () => document.dispatchEvent(event);
  }
  else
  {
    const neomeWidgetMain = document.createElement("div");
    neomeWidgetMain.id = neomeWidgetFloating;
    document.body.append(neomeWidgetMain);

    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.append(style);

    render(<Widget config={configObj} />, document.getElementById(neomeWidgetFloating)!);
  }
}
