import RefineSlug from "@/utilities/RefineSlug";
import WidgetBlocks from "@/utilities/WidgetBlock";
import nextFetch from "@/utilities/nextFetch";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params?: { slug?: string[] } | Promise<{ slug?: string[] }> 
}): Promise<Metadata> {
  // Handle params being undefined or a Promise (Next.js 15+)
  if (!params) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
  
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = RefineSlug(resolvedParams?.slug);
  
  if (!slug) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
  
  const data = await nextFetch(`api/general/${slug}`);

  console.log(`${slug}`,"dada");
  
  if (!data?.data?.seo) {
    return {
      title: "Page",
      description: "",
    };
  }
  
  return {
    title: data.data.seo.metaTitle || "Page",
    description: data.data.seo.metaDescription || "",
    openGraph: {
      title: data.data.seo.metaTitle || undefined,
      description: data.data.seo.metaDescription || undefined,
      images: data.data.seo.metaImage?.url?.url 
        ? [{ url: data.data.seo.metaImage.url.url }] 
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: data.data.seo.metaTitle || undefined,
      description: data.data.seo.metaDescription || undefined,
      images: data.data.seo.metaImage?.url?.url ? [data.data.seo.metaImage.url.url] : undefined,
    },
  };
}

interface CommonPageProps {
  params?: {
    slug?: string[];
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

const CommonPage = async ({ params, searchParams }: CommonPageProps) => {
  const options = {};
  
  // Handle params being undefined or a Promise (Next.js 15+)
  if (!params) {
    notFound();
  }
  
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = RefineSlug(resolvedParams?.slug);
  
  if (!slug) {
    notFound();
  }
  const data = await nextFetch(`api/general/${slug}`, options);
  if (!data) {
    notFound();
  }
  return (
    <main>
      <WidgetBlocks widgets={data?.data?.widgets} />
    </main>
  );
};

export default CommonPage;

