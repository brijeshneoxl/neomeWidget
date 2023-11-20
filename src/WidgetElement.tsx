import {useState} from "preact/compat";
import {useEffect} from "preact/compat";
import {useCallback} from "preact/compat";
import {useRef} from "preact/compat";
import {IGetMsgPayload} from "./base/types.ts";
import {IPostMsgResponse} from "./base/types.ts";
import {neomeFrameSrc} from "./base/types.ts";
import {IWidgetScriptConfig} from "./base/types.ts";
import {NeomePlaceHolder} from "./components/icons/NeomePlaceHolder.tsx";

export function RenderWidgetElement(props: {
  config?: IWidgetScriptConfig,
  showGif?: boolean
})
{
  const config = props.config;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const url = `${neomeFrameSrc}`;

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
        } as IGetMsgPayload, url);
      }
    }
  }, [isConnected, iframeRef.current]);

  useEffect(() =>
  {
    window.onmessage = (event) =>
    {
      if(event.origin === url)
      {
        const response = event.data as IPostMsgResponse;
        switch(response?.type)
        {
          case "connected":
            setIsConnected(true);
            break;
          case "disconnected":
            setIsConnected(false);
            break;
        }
      }
    };
  }, []);

  if(props.showGif)
  {
    return <NeomePlaceHolder />;
  }

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #DCDCDCFF"
      }}
      onLoad={onLoad}
      src={url}
      referrerpolicy={"no-referrer"}
      allow="camera; microphone; geolocation; fullscreen;"
    />
  );
}
