export interface ProductData {
    productResponseDtoList: ProductResponseDtoList[];
    numOfProducts:          number;
}

export interface ProductResponseDtoList{
    pid:         number;
    designer:    string;
    name:        string;
    color:       string;
    theme:       string;
    sizeOne:     string;
    sizeTwo:     string;
    sizeThree:   string;
    sizeFour:    string;
    sizeFive:    string;
    description: string;
    hashtags:    string;
    imageUrl:    string;
    shortDuration:                 boolean;
    longDuration:                  boolean;
    shortLastingMarkedPriceOne:    number;
    shortLastingMarkedPriceTwo:    number;
    shortLastingMarkedPriceThree:  number;
    shortLastingMarkedPriceFour:   number;
    shortLastingMarkedPriceFive:   number;
    shortLastingSellingPriceOne:   number;
    shortLastingSellingPriceTwo:   number;
    shortLastingSellingPriceThree: number;
    shortLastingSellingPriceFour:  number;
    shortLastingSellingPriceFive:  number;
    longLastingMarkedPriceOne:          number;
    longLastingMarkedPriceTwo:          number;
    longLastingMarkedPriceThree:        number;
    longLastingMarkedPriceFour:         number;
    longLastingMarkedPriceFive:         number;
    longLastingSellingPriceOne:       number;
    longLastingSellingPriceTwo:       number;
    longLastingSellingPriceThree:       number;
    longLastingSellingPriceFour:       number;
    longLastingSellingPriceFive:       number;
    stock:       number;
    likeNumber:       number;
}