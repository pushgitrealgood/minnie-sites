/** "19 October 2026" (UK time). Shared by the site and the post editor. */
export function postDate(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" }) : "";
}
