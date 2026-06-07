"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { Spotlight as UiSpotlight } from "@scandalorian/ui";
import { useStore } from "@/stores/StoreProvider";
import type { SwapiKey } from "@/stores/swapiStore";
import { getImageFromWikipedia } from "@/utils";

interface SpotlightProps {
  entity: SwapiKey;
}

interface Copy {
  headline: string;
  content: string[];
}

function getCopy(entity: SwapiKey, name: string): Copy {
  switch (entity) {
    case "people":
      return {
        headline: `${name} is at it again`,
        content: [
          `You will never guess what ${name} got into last night. Insiders spotted the galaxy's most talked-about celebrity slipping away from a private bash, and the holo-cams could not keep up.`,
          `Fresh off a top-secret production, ${name} arrived in style behind the controls of a borrowed cruiser — and sources say the night only got wilder from there.`,
          `Friends? Foes? A little of both? One thing is certain: when ${name} is in the sector, the whole system is watching. Stay tuned, star-gazers — this story is far from over.`,
        ],
      };
    case "planets":
      return {
        headline: `Trouble in paradise: what really happened on ${name}`,
        content: [
          `The locals on ${name} are not talking — but our sources never stop. Something big went down this weekend, and everyone who was there has gone suspiciously quiet.`,
          `Word is a certain A-list crowd has been quietly buying up property across ${name}, and the neighbors are furious about the all-night parties.`,
          `Is ${name} the galaxy's hottest new getaway or a scandal waiting to erupt? Either way, you did not hear it from us.`,
        ],
      };
    case "films":
      return {
        headline: `Behind the scenes: the ${name} secrets they don't want you to know`,
        content: [
          `The cast of ${name} swears everything was perfectly professional on set. The leaked footage tells a very different story.`,
          `Reshoots, walk-outs, and one very dramatic trailer meltdown — insiders say making ${name} was wilder than anything that made the final cut.`,
          `Will ${name} be the blockbuster of the season or the flop everyone saw coming? The whispers backstage are not kind.`,
        ],
      };
    case "rides":
      return {
        headline: `Spotted: who's been cruising around in the ${name}`,
        content: [
          `Whoever has been tearing across the system in the ${name} clearly wants to be seen. Mission accomplished — the whole galaxy is talking.`,
          `Rumor has it the ${name} changed hands in a very shady late-night deal, and the previous owner is not happy about it.`,
          `Fast, flashy, and just a little bit illegal — the ${name} is the must-have ride of the season, and someone is about to get caught with it.`,
        ],
      };
  }
}

function Spotlight({ entity }: SpotlightProps) {
  const store = useStore();
  const [imageUrl, setImageUrl] = useState<string>();

  const id = store.spotlight?.[entity];
  const value = id ? store.getEntity(entity, id) : undefined;
  const name = (typeof value === "string" ? value : value?.name) || "This week's star";

  const { headline, content } = getCopy(entity, name);

  useEffect(() => {
    if (!name) return;

    // gaurd against numerous request
    let active = true;
    getImageFromWikipedia(name).then((url) => {
      if (active) setImageUrl(url);
    });

    return () => {
      active = false;
    };
  }, [name]);

  return (
    <UiSpotlight
      headline={headline}
      content={content}
      image={
        imageUrl && <Image src={imageUrl} alt={name} fill sizes="(max-width: 48em) 100vw, 40vw" />
      }
    />
  );
}

export default observer(Spotlight);
