export interface Feedback {
	id: string;
	passenger_id: string;
	date: Date;
	comment: string | null;
	rating: number;
	created_at: Date;
	
}

export interface Location {
	id: string;
	address: string;
	category_id: string;
	created_at: Date;
	is_station: boolean;
}
  
export interface Passenger {
	id: string;
	name: string;
	email: string;
	phone: string;
	created_at: Date;
}
  
export interface Payment {
	id: string;
	ticket_id: string;
	method: string;
	date: Date;
	passenger_id: string;
	created_at: Date;
}
  
export interface Route {
	id: string;
	name: string;
	location_start_id: string;
	location_destiny_id: string;
	distance: number;
	created_at: Date;
}
  
export interface Staff {
	id: string;
	name: string;
	position_id: string;
	created_at: Date;
}
  
export interface StaffPosition {
	id: string;
	name: string;
	description: string;
	salary: number;
	created_at: Date;
}
  
export interface StaffVehicle {
	id: string;
	vehicle_id: string;
	staff_id: string;
	shift_start: Date;
	shift_finish: Date;
	created_at: Date;
}
  
export interface Ticket {
	id: string;
	price: number;
	created_at: Date;
}
  
export interface TransportCategory {
	id: string;
	name: string;
	created_at: Date;
}
  
export interface Transportation {
	id: string;
	date: Date;
	passenger_id: string;
	vehicle_id: string;
	created_at: Date;
}
  
export interface Vehicle {
	id: string;
	category_id: string;
	manufacturer: string;
	model: string;
	year: number;
	capacity: number;
	created_at: Date;
}
  
export interface VehicleRoute {
	id: string;
	vehicle_id: string;
	route_id: string;
	time_init: Date;
	time_end: Date;
	created_at: Date;
}
  