export interface Invoice {
    invoiceCode: string;
    fromStreet: string;
    fromCity: string;
    fromPostCode: string;
    fromCountry: string;
    clientName: string;
    email: string;
    toStreet: string;
    toCity: string;
    toPostCode: string;
    toCountry: string;
    invoiceDate: string;
    due: string;
    desc: string;
    items: Item[];
    status: string;
    totalAmount: string;
};

export interface Item {
    itemName: string;
    quantity: number;
    price: string;
    total: string;
}