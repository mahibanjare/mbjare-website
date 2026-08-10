/**
 * Content access layer — reads from Supabase when configured, and always
 * falls back to the checked-in content files so the site never breaks.
 * Edit content at /admin once Supabase env vars are set.
 */
import type { Service, GrowthPackage, Project, Testimonial } from '@/types/content'
import { sbSelect } from '@/lib/supabase'
import { services as localServices } from '@/content/services'
import { packages as localPackages } from '@/content/packages'
import { projects as localProjects } from '@/content/projects'
import { testimonials as localTestimonials } from '@/content/testimonials'
import { faqs as localFaqs } from '@/content/site'

export interface Faq {
  q: string
  a: string
}

export async function getServices(): Promise<Service[]> {
  return (await sbSelect<Service>('mbjare_services')) ?? localServices
}

export async function getService(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((s) => s.slug === slug)
}

export async function getRelatedServices(service: Service): Promise<Service[]> {
  const all = await getServices()
  return (service.related ?? [])
    .map((slug) => all.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s))
}

export async function getPackages(): Promise<GrowthPackage[]> {
  return (await sbSelect<GrowthPackage>('mbjare_packages')) ?? localPackages
}

export async function getProjects(): Promise<Project[]> {
  return (await sbSelect<Project>('mbjare_projects')) ?? localProjects
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await sbSelect<Testimonial>('mbjare_testimonials')) ?? localTestimonials
}

export async function getFaqs(): Promise<Faq[]> {
  return (await sbSelect<Faq>('mbjare_faqs')) ?? [...localFaqs]
}
