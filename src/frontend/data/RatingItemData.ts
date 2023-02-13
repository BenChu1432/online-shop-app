export interface RatingItemData {
    pruid:                   number;
    product:                 Product;
    user:                    User;
    starsGiven:              number;
    totalStars:              number;
    totalNumOfUsersWhoRated: number;
    averageStars:            number;
}

export interface Product {
    pid:         number;
    name:        string;
    theme:       string;
    color:       string;
    sizeZero:    null;
    sizeOne:     string;
    sizeTwo:     null;
    sizeThree:   null;
    description: string;
    imageUrl:    string;
    price:       number;
    stock:       number;
}

export interface User {
    uid:           number;
    username:      string;
    email:         string;
    password:      string;
    firebaseUid:   string;
    emailVerified: boolean;
    subscribed:    boolean;
}
