import { useState, useEffect } from "react";

export type devices = "desktop" | "mobile";

export default function useMediaQuery() {
  const [device, setDevice] = useState<devices>("desktop");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 576px)");
    if (media.matches && "mobile" !== device) {
      setDevice("mobile");
    }
    if (!media.matches && "desktop" !== device) {
      setDevice("desktop");
    }
    const listener = () => {
      setDevice(media.matches ? "mobile" : "desktop");
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [device]);

  return device;
}
