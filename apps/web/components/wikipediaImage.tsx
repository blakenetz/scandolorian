import Image from "next/image";
import { spotlightFallback } from "@scandalorian/ui";

export async function getImageUrl(name: string): Promise<string | undefined> {
  const title = name?.trim().replace(/\s+/g, "_");

  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);

  try {
    if (!res.ok) throw Error("Response not ok");
    const data = (await res.json()) as Record<string, any>;
    return data.originalimage.source;
  } catch (error) {
    console.warn("Unable to get image from wikipedia", error);
  }
}

export default async function SpotlightImage({ name }: { name: string }) {
  const url = await getImageUrl(name);

  if (!url) {
    return <img src={spotlightFallback} aria-hidden />;
  }

  return <Image src={url} alt={name} fill sizes="(max-width: 48em) 100vw, 40vw" />;
}
