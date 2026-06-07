import Image from "next/image";
import { spotlightFallback } from "@scandalorian/ui";
import { getImageFromWikipedia } from "@/utils";

export default async function SpotlightImage({ name }: { name: string }) {
  const url = await getImageFromWikipedia(name);

  if (!url) {
    return <img src={spotlightFallback} aria-hidden />;
  }

  return <Image src={url} alt={name} fill sizes="(max-width: 48em) 100vw, 40vw" />;
}
