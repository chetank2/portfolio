export type ViewMode = "human" | "machine";

export function getViewMode(url: URL): ViewMode {
  return url.searchParams.get("view") === "machine" ? "machine" : "human";
}
