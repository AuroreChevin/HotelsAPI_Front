import { City } from "./city.model";
import { User } from "./user.model";

export class Hotel {
    id : number;
    hotelName : string;
    address : string;
    phone : string;
    nbRoom : number;
    nbStar : number;
    priceRoom : number;
    city : City;
    users : User[];
    constructor(id : number, hotelName : string, address : string, phone : string, nbRoom : number, nbStar : number, priceRoom : number, city : City,users : User[]){
        this.id = id;
        this.hotelName = hotelName;
        this.address = address;
        this.phone = phone;
        this.nbRoom = nbRoom;
        this.nbStar = nbStar;
        this.priceRoom = priceRoom;
        this.city = city;
        this.users = users;
    }
}
