import { useEffect } from "react";

/** Keeps the tab title and meta description in step with the current page and language. */
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}
