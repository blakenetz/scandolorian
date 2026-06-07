import { Suspense } from "react";
import { Skeleton } from "@mantine/core";
import { Spotlight as UiSpotlight } from "@scandalorian/ui";
import { getSpotlight } from "@/stores/fetchInitialCache";
import Link from "next/link";
import WikipediaImage from "../wikipediaImage";
import { routeMap, SwapiKey } from "@/types";
import { getCopy } from "@/utils";

interface SpotlightProps {
  entity: SwapiKey;
}

export default async function Spotlight({ entity }: SpotlightProps) {
  const name = (await getSpotlight(entity)) || "This week's star";
  const { headline, content } = getCopy(entity, name)!;

  const route = routeMap[entity];

  return (
    <UiSpotlight
      headline={headline}
      content={content}
      link={(children) => <Link href={route}>{children}</Link>}
      image={
        <Suspense fallback={<Skeleton animate />}>
          <WikipediaImage name={name} />
        </Suspense>
      }
    />
  );
}
