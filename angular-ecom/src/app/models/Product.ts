export class Product {
    productName: string;
    productDesc: string;
    productPrice: number;
    productQuantity: number;
    live: boolean;
    stock: boolean;
    imageName: string;
    categoryId: number;


    constructor(productName: string, productDesc: string, productPrice: number, productQuantity: number, live: boolean, stock: boolean, imageName: string, categoryId: number) {
        this.productName = productName
        this.productDesc = productDesc
        this.productPrice = productPrice
        this.productQuantity = productQuantity
        this.live = live
        this.stock = stock
        this.imageName = imageName
        this.categoryId = categoryId
    }





    public getProductName(): string {
        return this.productName;
    }

    public getProductDesc(): string {
        return this.productDesc;
    }

    public getProductPrice(): number {
        return this.productPrice;
    }

    public getProductQuantity(): number {
        return this.productQuantity;
    }

    public getLive(): boolean {
        return this.live;
    }

    public getStock(): boolean {
        return this.stock;
    }

    public getImageName(): string {
        return this.imageName;
    }

    public getCategoryId(): number {
        return this.categoryId;
    }




}