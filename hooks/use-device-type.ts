import * as React from "react";

const MOBILE_MAX = 767;
const TABLET_MIN = 768;
const TABLET_MAX = 1023;

type DeviceType = "mobile" | "tablet" | "desktop";

export function useDeviceType(): {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
} {
  const [deviceType, setDeviceType] = React.useState<DeviceType>(() => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width <= MOBILE_MAX) return "mobile";
    if (width >= TABLET_MIN && width <= TABLET_MAX) return "tablet";
    return "desktop";
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= MOBILE_MAX) setDeviceType("mobile");
      else if (width >= TABLET_MIN && width <= TABLET_MAX)
        setDeviceType("tablet");
      else setDeviceType("desktop");
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    mobile: deviceType === "mobile",
    tablet: deviceType === "tablet",
    desktop: deviceType === "desktop",
  };
}
