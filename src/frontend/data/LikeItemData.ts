export interface LikeItemData {
    lid:                number;
    clickedLike:        boolean;
    productResponseDto: ProductResponseDto;
}

export interface ProductResponseDto {
    pid:                           number;
    designer:                      string;
    name:                          string;
    theme:                         string;
    color:                         string;
    sizeOne:                       string;
    sizeTwo:                       string;
    sizeThree:                     string;
    sizeFour:                      string;
    sizeFive:                      string;
    description:                   string;
    hashtags:                      string;
    imageUrl:                      string;
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
    longLastingMarkedPriceOne:     number;
    longLastingMarkedPriceTwo:     number;
    longLastingMarkedPriceThree:   number;
    longLastingMarkedPriceFour:    number;
    longLastingMarkedPriceFive:    number;
    longLastingSellingPriceOne:    number;
    longLastingSellingPriceTwo:    number;
    longLastingSellingPriceThree:  number;
    longLastingSellingPriceFour:   number;
    longLastingSellingPriceFive:   number;
    stock:                         number;
    totalRating:                   number;
    totalNumOfUsersWhoLiked:       number;
    likeNumber:                    number;
}
