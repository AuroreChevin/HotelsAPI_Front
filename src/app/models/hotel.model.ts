import { City } from "./city.model";

export class Hotel {
    id : number;
    hotelName : string;
    address : string;
    phone : string;
    nbRoom : number;
    nbStar : number;
    priceRoom : number;
    city : City;
    constructor(id : number, hotelName : string, address : string, phone : string, nbRoom : number, nbStar : number, priceRoom : number, city : City){
        this.id = id;
        this.hotelName = hotelName;
        this.address = address;
        this.phone = phone;
        this.nbRoom = nbRoom;
        this.nbStar = nbStar;
        this.priceRoom = priceRoom;
        this.city = city;
    }
}
