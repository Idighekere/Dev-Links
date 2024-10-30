export interface Platform {
  name: string
  url: string
}

export interface Links {
  id: string
  platform:string
  url: string
}

export interface LinkState {
  initialLinks?: Links[]
  links: Links[]
  hasChanges: boolean
  loading: boolean
}

export interface LinkAction {
  setLoading: (loading: boolean) => void
  setLinks: (links: Links[]) => void
  setInitialLinks: (fetchedLinks: Links[]) => void
  getLinkData: () => Promise<(() => void) | undefined>
  setHasChanges: (hasChanges: boolean) => void
}
