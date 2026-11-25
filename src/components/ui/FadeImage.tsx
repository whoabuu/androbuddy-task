import { useState, type ImgHTMLAttributes } from "react";

/** Lazy-loaded <img> that fades in once the file has loaded. */
export default function FadeImage({
  className = "",
  onLoad,
  alt = "",
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      loading="lazy"
      decoding="async"
      alt={alt}
      {...rest}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
