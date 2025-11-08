"use client";
import { useLang } from "./LangProvider";
export default function Trans({ k, as:Tag="span", className }) {
  const { t } = useLang();
  return <Tag className={className}>{t[k] ?? k}</Tag>;
}
