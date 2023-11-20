import {useRef} from "preact/compat";
import {useEffect} from "preact/compat";
import {useCallback} from "preact/compat";
import {useState} from "preact/compat";
import "./app.css";
import {getPositionStyle} from "./base/plus.ts";
import {IGetMsgPayload} from "./base/types.ts";
import {neomeFrameContainerId} from "./base/types.ts";
import {IWidgetScriptConfig} from "./base/types.ts";
import {IPostMsgResponse} from "./base/types.ts";
import {neomeFrameSrc} from "./base/types.ts";
import {neomeFrameId} from "./base/types.ts";
import {CrossSvg} from "./components/icons/Svgs.tsx";
import {WidgetButton} from "./components/WidgetButton.tsx";

export function Widget(props: {
  config?: IWidgetScriptConfig
})
{
  const config = props.config;
  const url = `${neomeFrameSrc}`;
  const [open, setOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [badgeCount, setBadgeCount] = useState<number>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetPosition = config?.floatingButtonPosition ?? "bottomRight";
  const widgetWidth = config?.widgetWidth || "360px";
  const widgetHeight = config?.widgetHeight || "600px";

  const widgetMargin = getWidgetMargin(config);

  const positionStyle = getPositionStyle(
    widgetPosition,
    widgetMargin.position1,
    widgetMargin.position2);

  const onLoad = useCallback(() =>
  {
    setTimeout(() =>
    {
      if(iframeRef.current)
      {
        iframeRef.current.contentWindow?.postMessage({
          type: "init",
          payload: config
        } as IGetMsgPayload, url);
      }
    }, 500);
  }, [config]);

  useEffect(() =>
  {
    if(iframeRef.current)
    {
      if(!isConnected)
      {
        iframeRef.current.contentWindow?.postMessage({
          type: "init",
          payload: config
        }, url);
      }
    }
  }, [isConnected, iframeRef.current]);

  useEffect(() =>
  {
    window.onmessage = (event) =>
    {
      if(event.origin === neomeFrameSrc)
      {
        const response = event.data as IPostMsgResponse;
        switch(response?.type)
        {
          case "connected":
            setIsConnected(true);
            break;
          case "badge":
            if(response.payload)
            {
              setBadgeCount(response.payload);
            }
            break;
          case "disconnected":
            setIsConnected(false);
            break;
        }
      }
    };
  }, []);

  return (
    <>
      <div
        id={neomeFrameContainerId}
        style={{
          display: open ? "unset" : "none",
          width: widgetWidth,
          height: widgetHeight,
          ...positionStyle
        }}
      >
        {
          config?.onOpenHideWidgetButton &&
          <CrossElement onClick={() => setOpen(false)} />
        }
        <iframe
          ref={iframeRef}
          id={neomeFrameId}
          onLoad={onLoad}
          src={url}
          referrerpolicy={"no-referrer"}
          allow="camera; microphone; geolocation; fullscreen;"
        />
      </div>

      <WidgetButton
        open={open}
        config={config}
        onClick={setOpen}
        maxCount={100}
        badgeCount={badgeCount}
        position={widgetPosition}
      />
    </>
  );
}

function CrossElement(props: {
  onClick: () => void,
})
{
  return <div
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      userSelect: "none",
      background: "#b3261e",
      borderTopRightRadius: "8px",
      borderBottomLeftRadius: "12px"
    }}
    onClick={props.onClick}
  >
    <CrossSvg />
  </div>;
}

function getWidgetMargin(config?: IWidgetScriptConfig)
{
  const defaultPosition = config?.widgetMargin ?? 32;
  const position1 = config?.onOpenHideWidgetButton ? defaultPosition : (defaultPosition + 60);
  return {
    position1: `${position1}px`,
    position2: `${defaultPosition}px`
  };
}
