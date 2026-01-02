/// <reference types="astro/client" />

declare module "sanity:client" {
  import { SanityClient } from "@sanity/client";
  export const sanityClient: SanityClient;
}


