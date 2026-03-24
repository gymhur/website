import { client } from '@/lib/sanity/client';
import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import CategoryGrid from '@/components/home/CategoryGrid';
import WhyGymhur from '@/components/home/WhyGymhur';
import HowItWorks from '@/components/home/HowItWorks';
import CtaBanner from '@/components/home/CtaBanner';

async function getHomeData() {
  const [homePage, categories] = await Promise.all([
    client.fetch(`*[_type == "homePage"][0]`).catch(() => null),
    client.fetch(`*[_type == "productCategory"] | order(_createdAt asc)`).catch(() => []),
  ]);
  return { homePage, categories };
}

export default async function Home() {
  const { homePage, categories } = await getHomeData();

  return (
    <main>
      <Hero
        headline={homePage?.heroHeadline ?? 'Custom Sportswear, Built for Your Brand'}
        subheadline={homePage?.heroSubheadline ?? 'Complete custom manufacturing for brands and retailers. Low MOQs. OEM & ODM solutions from Sialkot, Pakistan.'}
        ctaText={homePage?.heroCtaText ?? 'Get a Quote'}
      />
      <TrustBar />
      <CategoryGrid categories={categories ?? []} />
      <WhyGymhur points={homePage?.whyPoints ?? []} />
      <HowItWorks />
      <CtaBanner />
    </main>
  );
}
