/**
 * Built-in content (src/content/*) → Supabase rows.
 *
 * The site shows Supabase rows once a table has any, so the built-in
 * entries must live in the table too — otherwise adding the first entry
 * from /admin would hide all the old ones.
 */
import { projects } from '@/content/projects'
import { testimonials } from '@/content/testimonials'
import { faqs } from '@/content/site'

type Row = Record<string, unknown>

interface SeedSource {
  /** Row label shown in the admin banner */
  label: string
  /** Columns used to decide "already in the table" */
  matchKeys: string[]
  rows: () => Row[]
}

export const seedSources: Record<string, SeedSource> = {
  mbjare_projects: {
    label: 'title',
    matchKeys: ['title', 'url'],
    rows: () =>
      projects.map((p, i) => ({
        sort: i + 1,
        title: p.title,
        url: p.url ?? null,
        category: p.category,
        desc: p.desc,
        deliverables: p.deliverables,
        tags: p.tags,
        year: p.year,
        image: p.image ?? null,
      })),
  },
  mbjare_testimonials: {
    label: 'name',
    matchKeys: ['name'],
    rows: () =>
      testimonials.map((t, i) => ({ sort: i + 1, name: t.name, role: t.role, msg: t.msg, rating: t.rating })),
  },
  mbjare_faqs: {
    label: 'q',
    matchKeys: ['q'],
    rows: () => faqs.map((f, i) => ({ sort: i + 1, q: f.q, a: f.a })),
  },
}

export const seedTables = Object.keys(seedSources)

const norm = (v: unknown) =>
  String(v ?? '')
    .toLowerCase()
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace(/[^a-z0-9ऀ-ॿ]+/g, '')

/** Built-in entries of `table` not yet present in `existing` rows. */
export function missingDefaults(table: string, existing: Row[]): Row[] {
  const src = seedSources[table]
  if (!src) return []
  const seen = src.matchKeys.map((k) => new Set(existing.map((r) => norm(r[k])).filter(Boolean)))
  return src.rows().filter((row) => !src.matchKeys.some((k, i) => row[k] && seen[i].has(norm(row[k]))))
}

/** Labels of the missing built-in entries, per table — for the admin banner. */
export function missingDefaultLabels(data: Record<string, Row[]>): Record<string, string[]> {
  return Object.fromEntries(
    seedTables.map((t) => [t, missingDefaults(t, data[t] ?? []).map((r) => String(r[seedSources[t].label]))]),
  )
}
