import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // revalidate at most once every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://centralasianmuseum.org";
  const now = new Date();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about/building`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/complex`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/collections`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/news-events`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic News & Events
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const newsEvents = await prisma.newsEvent.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
    });

    newsPages = newsEvents.map((item) => ({
      url: `${siteUrl}/news-events/${item.slug}`,
      lastModified: item.updatedAt || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating sitemap news routes:", error);
  }

  // Dynamic Exhibitions (only if they exist in DB)
  let exhibitionPages: MetadataRoute.Sitemap = [];
  try {
    const exhibitions = await prisma.exhibition.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
    });

    if (exhibitions.length > 0) {
      exhibitionPages.push({
        url: `${siteUrl}/exhibitions`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      exhibitions.forEach((item) => {
        exhibitionPages.push({
          url: `${siteUrl}/exhibitions/${item.slug}`,
          lastModified: item.updatedAt || now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error("Error generating sitemap exhibition routes:", error);
  }

  return [...staticPages, ...newsPages, ...exhibitionPages];
}
