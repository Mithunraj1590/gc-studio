import WidgetBlocks from "@/utilities/WidgetBlock";
import nextFetch from "@/utilities/nextFetch";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await nextFetch(`api/general/home`);
  return {
    title: data?.homepage?.data?.seo?.metaTitle,
    description: data?.homepage?.data?.seo?.metaDescription,
    openGraph: {
      images: data?.homepage?.data?.seo?.metaImage?.url?.url,
    },
  };
}

const HomePage = async () => {
  const data = await nextFetch("api/general/home");
  return (
    <>
      <main className="isHome">
        {data && <WidgetBlocks widgets={data?.data?.widgets}></WidgetBlocks>}
      </main>
    </>
  );
};

export default HomePage;

