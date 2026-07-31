// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.sceniccottage.com/sitemap.xml",
    host: "https://www.sceniccottage.com",
  };
}
