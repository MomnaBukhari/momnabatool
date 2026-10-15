import { useEffect } from "react";

const SITE = "Syeda Momna Batool";

/** Sets the browser tab title for a page. */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Software Engineer (PHP, Laravel)`;
  }, [title]);
}
