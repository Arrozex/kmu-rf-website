import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'kjuborao',
  dataset: 'production',
  apiVersion: '2026-08-26',
  useCdn: false,
})