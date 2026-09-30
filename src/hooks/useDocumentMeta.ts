import { useEffect } from "react";

const SITE_ORIGIN = "https://amidousoro.me";

/**
 * Keeps the tab title, meta description and canonical link in step with the
 * current page and language. The canonical drops the query string, so a
 * filtered /projects?tech=… still points at /projects.
 */
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title;
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", `${SITE_ORIGIN}${window.location.pathname}`);
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}
