import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { services, getServiceBySlug } from "@/app/data/services";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/app/lib/seo";
import { siteConfig } from "@/app/data/site";
import JsonLd from "@/app/Components/JsonLd";
import ServiceIcon from "@/app/Components/ServiceIcon";
import ServiceLeadForm from "@/app/Components/ServiceLeadForm";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return buildMetadata({ title: "Service not found", description: "Unknown service", path: `/services/${slug}`, noIndex: true });

  return buildMetadata({
    title: `${service.title} | ${siteConfig.name}`,
    description: `${service.description.slice(0, 155)}…`,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const isLearner = service.category === "learners";
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 2);
  const categoryLabel = isLearner ? "For Learners" : "For EdTech Brands & Universities";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: SITE_URL,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.state,
        addressCountry: "IN",
      },
    },
    areaServed: "IN",
    serviceType: service.shortTitle,
    url: `${SITE_URL}/services/${service.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="w-full bg-[#0b0d12] text-[#f1f5f9]">
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(900px 450px at 85% -10%, rgba(200,30,61,0.22), transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link href="/services" className="inline-flex items-center gap-2 text-[#8b96a8] hover:text-[#e0244a] text-sm font-bold transition-colors mb-8">
            <ArrowLeft size={15} /> All Services
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#C81E3D]/15 border border-[#e0244a]/30 flex items-center justify-center">
              <ServiceIcon slug={service.slug} size={26} className="text-[#e0244a]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-[#e0244a] bg-[#2B141A] border border-[#e0244a]/25 rounded-full px-4 py-1.5">
              {categoryLabel}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight max-w-4xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-[#c4cbd8] font-medium max-w-2xl">{service.tagline}</p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-7 space-y-10">
          {/* Overview */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-3">What this is</h2>
            <p className="text-[#a8b3c5] leading-7 font-medium">{service.description}</p>
          </div>

          {/* What's included */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">What you get</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 rounded-2xl border border-white/5 bg-[#14161d] p-4 text-sm font-medium text-[#c4cbd8] leading-snug">
                  <CheckCircle2 size={16} className="text-[#e0244a] mt-0.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">How it works</h2>
            <ol className="space-y-3">
              {service.process.map((p, i) => (
                <li key={p.step} className="flex items-start gap-4 rounded-2xl border border-white/5 bg-[#14161d] p-4">
                  <span className="w-9 h-9 rounded-xl bg-[#C81E3D] text-white text-sm font-black flex items-center justify-center shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[#f1f5f9] font-bold">{p.step}</span>
                    <span className="block text-[#8b96a8] text-sm font-medium mt-0.5 leading-snug">{p.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">Common questions</h2>
            <div className="space-y-3">
              {service.faqs.map((f) => (
                <details key={f.question} className="group rounded-2xl border border-white/5 bg-[#14161d] open:border-[#e0244a]/30 transition-colors">
                  <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-[#f1f5f9] font-bold text-sm sm:text-base">
                    {f.question}
                    <span className="text-[#e0244a] text-xl font-black leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-[#a8b3c5] leading-6 font-medium border-t border-white/5 pt-3">
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold mb-4">Related services</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/services/${r.slug}`} className="group rounded-2xl border border-white/5 bg-[#14161d] p-5 hover:border-[#e0244a]/40 transition-all">
                    <ServiceIcon slug={r.slug} size={20} className="text-[#e0244a] mb-3" />
                    <p className="text-[#f1f5f9] font-bold text-sm leading-snug group-hover:text-white">{r.title}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[#e0244a] text-xs font-bold">
                      Learn more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky form */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <ServiceLeadForm defaultService={service.title} heading="Get a free callback" subheading="One business day response. No obligation, no template pitch." />
          </div>
        </aside>
      </div>
    </div>
  );
}
