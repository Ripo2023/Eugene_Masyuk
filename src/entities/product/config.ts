export interface IProduct {
    name: string;
    description: string;
    image: string;
    price: number;
    components: IProductComponent[]
    volume: string[];
    id: number;
}
export interface IProductComponent {
    value: string;
     image: string
}

export interface IBanner {
    image: string;
    id: number;
}