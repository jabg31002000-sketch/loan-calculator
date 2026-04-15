import { useEffect } from "react";

/**
 * 페이지별 <title> 과 <meta name="description"> 을 동적으로 설정합니다.
 * 페이지 언마운트 시 이전 값으로 복원합니다.
 */
export function useSeo(title, description) {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta ? meta.content : "";

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    return () => {
      document.title = prevTitle;
      if (meta) meta.content = prevDesc;
    };
  }, [title, description]);
}
