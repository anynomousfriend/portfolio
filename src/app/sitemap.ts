import type { MetadataRoute } from "next";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://subhankarchoudhury.vercel.app";

const projectSlugs = [
  "pay-per-request",
  "temporal-vault",
  "zk-consent-gateway",
  "zen-resume",
  "llm-chess-arena",
  "iexec-iapp",
  "afo-qubic",
  "fathom-0x",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
