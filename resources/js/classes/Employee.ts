import {Entity} from "../interfaces/entity";

export class Employee implements Entity {
    id: number;
    photo: string;
    name: string;
    email: string;
    phone_number: string;
    salary: number;
    date_of_employment: string;
    position: any;
    head: any;
    admin_created_id: number;
    admin_updated_id: number;
    created_at: string;
    updated_at: string;

    constructor(
        id = 0,
        photo = '',
        name = '',
        email = '',
        phone_number = '',
        salary = 0,
        date_of_employment = '',
        position = [],
        head = [],
        admin_created_id = 0,
        admin_updated_id = 0,
        created_at = '',
        updated_at = '',
    ) {
        this.id = id;
        this.photo = photo;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
        this.salary = salary;
        this.date_of_employment = date_of_employment;
        this.position = position;
        this.head = head;
        this.admin_created_id = admin_created_id;
        this.admin_updated_id = admin_updated_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
