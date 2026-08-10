/** Field definitions for the admin panel forms — plain data, safe to import anywhere. */

export type FieldType = 'text' | 'textarea' | 'lines' | 'json' | 'number'

export interface Field {
  key: string
  label: string
  type: FieldType
  hint?: string
}

export interface Collection {
  table: string
  title: string
  labelField: string
  fields: Field[]
}

const sort: Field = { key: 'sort', label: 'Order (chhota number pehle)', type: 'number' }

export const collections: Collection[] = [
  {
    table: 'mbjare_services',
    title: 'Services',
    labelField: 'title',
    fields: [
      sort,
      { key: 'slug', label: 'Slug (URL)', type: 'text', hint: 'e.g. website-development' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
      { key: 'icon', label: 'Icon', type: 'text', hint: 'Globe, Workflow, Share2, Palette, MapPin, TrendingUp, Smartphone…' },
      { key: 'features', label: 'Features (ek line = ek feature)', type: 'lines' },
      { key: 'price', label: 'Price', type: 'text' },
      { key: 'timeline', label: 'Timeline', type: 'text' },
      { key: 'badge', label: 'Badge (optional: AI / POPULAR / NEW)', type: 'text' },
      { key: 'related', label: 'Related service slugs (ek line = ek slug)', type: 'lines' },
      { key: 'image', label: 'Image URL (optional)', type: 'text' },
    ],
  },
  {
    table: 'mbjare_packages',
    title: 'Packages',
    labelField: 'name',
    fields: [
      sort,
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'forWho', label: 'For who', type: 'textarea' },
      { key: 'icon', label: 'Icon', type: 'text', hint: 'Rocket, Sparkles, Store, Trophy, Zap…' },
      { key: 'includes', label: 'Includes (ek line = ek item)', type: 'lines' },
      { key: 'outcome', label: 'Outcome line', type: 'textarea' },
      { key: 'price', label: 'Price', type: 'text' },
      { key: 'priceNote', label: 'Price note (optional)', type: 'text' },
      { key: 'timeline', label: 'Timeline', type: 'text' },
      { key: 'badge', label: 'Badge (optional: FLAGSHIP / AI / NEW BUSINESS)', type: 'text' },
      { key: 'proof', label: 'Proof (JSON: client, url, image, note)', type: 'json' },
      { key: 'services', label: 'Bundled service slugs (ek line = ek slug)', type: 'lines' },
    ],
  },
  {
    table: 'mbjare_projects',
    title: 'Portfolio',
    labelField: 'title',
    fields: [
      sort,
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'url', label: 'Live URL', type: 'text' },
      { key: 'category', label: 'Category', type: 'text', hint: 'Websites / Branding / Social & Ads / Automation' },
      { key: 'desc', label: 'Description', type: 'textarea' },
      { key: 'deliverables', label: 'Deliverables (ek line = ek item)', type: 'lines' },
      { key: 'tags', label: 'Tags (ek line = ek tag)', type: 'lines' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'image', label: 'Screenshot path (e.g. /projects/name.png)', type: 'text' },
    ],
  },
  {
    table: 'mbjare_testimonials',
    title: 'Testimonials',
    labelField: 'name',
    fields: [
      sort,
      { key: 'name', label: 'Client name', type: 'text' },
      { key: 'role', label: 'Role / project', type: 'text' },
      { key: 'msg', label: 'Message', type: 'textarea' },
      { key: 'rating', label: 'Rating (1–5)', type: 'number' },
    ],
  },
  {
    table: 'mbjare_faqs',
    title: 'FAQs',
    labelField: 'q',
    fields: [
      sort,
      { key: 'q', label: 'Question', type: 'text' },
      { key: 'a', label: 'Answer', type: 'textarea' },
    ],
  },
]

export const tableWhitelist = collections.map((c) => c.table)
