import { UUID } from "crypto";

export interface Feedback {
	id: UUID;
	passenger_id: UUID;
	date: Date;
	comment: string | null;
	rating: number;
	created_at: Date;
}

export interface Location {
	id: UUID;
	address: string;
	category_id: UUID;
	created_at: Date;
	is_station: boolean;
}
  
export interface Passenger {
	id: UUID;
	name: string;
	email: string;
	phone: string;
	created_at: Date;
}
  
export interface Payment {
	id: UUID;
	ticket_id: UUID;
	method: string;
	date: Date;
	passenger_id: UUID;
	created_at: Date;
}
  
export interface Route {
	id: UUID;
	name: string;
	location_start_id: UUID;
	location_destiny_id: UUID;
	distance: number;
	created_at: Date;
}
  
export interface Staff {
	id: UUID;
	name: string;
	position_id: UUID;
	created_at: Date;
}
  
export interface StaffPosition {
	id: UUID;
	name: string;
	description: string;
	salary: number;
	created_at: Date;
}
  
export interface StaffVehicle {
	id: UUID;
	vehicle_id: UUID;
	staff_id: UUID;
	shift_start: Date;
	shift_finish: Date;
	created_at: Date;
}
  
export interface Ticket {
	id: UUID;
	price: number;
	created_at: Date;
}
  
export interface TransportCategory {
	id: UUID;
	name: string;
	created_at: Date;
}
  
export interface Transportation {
	id: UUID;
	date: Date;
	passenger_id: UUID;
	vehicle_id: UUID;
	created_at: Date;
}
  
export interface Vehicle {
	id: UUID;
	category_id: UUID;
	manufacturer: string;
	model: string;
	year: number;
	capacity: number;
	created_at: Date;
}
  
export interface VehicleRoute {
	id: UUID;
	vehicle_id: UUID;
	route_id: UUID;
	time_init: Date;
	time_end: Date;
	created_at: Date;
}
  