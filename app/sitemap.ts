import type { MetadataRoute } from "next";
import { collegeReviews } from "./data/colleges";
import { specialisations } from "./data/specialisations";
import { programs } from "./data/programs";
import { SITE_URL } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/find-my-program`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/universities`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/programs`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/roi-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/scholarships`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/alumni`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/community`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/specialisations`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/compare-programs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE_URL}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const universityPages: MetadataRoute.Sitemap = collegeReviews.map((col) => ({
    url: `${SITE_URL}/universities/${col.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const specialisationPages: MetadataRoute.Sitemap = specialisations.map((spec) => ({
    url: `${SITE_URL}/specialisations/${spec.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const programPages: MetadataRoute.Sitemap = programs.map((prog) => ({
    url: `${SITE_URL}/programs/${prog.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...universityPages, ...specialisationPages, ...programPages];
}
