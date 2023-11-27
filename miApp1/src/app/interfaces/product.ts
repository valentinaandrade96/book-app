export interface Item {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
}

export interface SearchInfo {
    textSnippet: string;
}
  
export interface VolumeInfo {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printType: string;
    categories?: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
    averageRating?: number;
    ratingsCount?: number;
}

export interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Epub;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  }
  export interface Epub {
    isAvailable: boolean;
    acsTokenLink?: string;
}

export interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice?: ListPrice;
    retailPrice?: ListPrice;
    buyLink?: string;
    offers?: Offer[];
  }

  export interface Offer {
    finskyOfferType: number;
    listPrice: ListPrice2;
    retailPrice: ListPrice2;
    giftable: boolean;
}



export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface RootObject {
    kind: string;
    totalItems: number;
    items: Item[];
  }

  interface ListPrice2 {
    amountInMicros: number;
    currencyCode: string;
  }
  
  export interface ListPrice {
    amount: number;
    currencyCode: string;
  }

  interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  }
  
  interface ReadingModes {
    text: boolean;
    image: boolean;
  }
  
  interface IndustryIdentifier {
    type: string;
    identifier: string;
  }


