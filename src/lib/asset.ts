export function asset(path: string) {
  if (/^https?:\/\//i.test(path)) return path;

  const clean = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || "/";
  const baseWithSlash = base.endsWith("/") ? base : `${base}/`;
  return `${baseWithSlash}${clean}`;
}
