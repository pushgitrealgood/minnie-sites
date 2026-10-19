/** Where an uploaded picture goes in the media bucket: site/what-it-is-timestamp.ext (never overwrites). */
export function uploadPath(site: string, name: string, fileName: string) {
  const ext = (fileName.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  return `${site}/${name.replace(/[^a-z0-9.]/gi, "-")}-${Date.now()}.${ext}`;
}
