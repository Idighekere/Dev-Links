
export interface Platform {
  name: string;
  url: string;
  
}

export interface Links {
  id: string;
  platform: Platform;
}


export interface LinkState {
     initialLinks?: Links[];
    links:Links[]
    userData?: any;
    hasChanges:boolean
}

export interface LinkAction {
    addLink: () => void;
    saveLink: () => Promise<void>;
    removeLink: (id: string) => void;
    updateLink: (id: string, updatedLink: Partial<Links>) => void;
    setInitialLinks:(fetchedLinks:Links[])=>void

}
