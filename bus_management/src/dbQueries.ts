import { sql } from "./dbConnection";
import {v4 as uuidv4} from 'uuid'
import {
	Feedback,
	Location,
	Passenger,
	Payment,
	Route,
	Staff,
	StaffPosition,
	StaffVehicle,
	Ticket,
	TransportCategory,
	Transportation,
	Vehicle,
	VehicleRoute,
} from "./dbTypes";

export async function getTransportCategories(): Promise<TransportCategory[]> {
	try {
		const categories = await sql<TransportCategory[]>`
			SELECT * FROM main.transport_category
		`;
		return categories;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getLocations(): Promise<Location[]> {
	try {
		const locations = await sql<Location[]>`
			SELECT * FROM main.location
		`;
		return locations;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getStations(): Promise<Location[]> {
	try {
		const locations = await sql<Location[]>`
			SELECT * FROM main.location WHERE is_station = true
		`;
		return locations;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getPassengers(): Promise<Passenger[]> {
	try {
		const passengers = await sql<Passenger[]>`
			SELECT * FROM main.passenger
		`;
		return passengers;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getPayments(): Promise<Payment[]> {
	try {
		const payments = await sql<Payment[]>`
			SELECT * FROM main.payment
		`;
		return payments;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getRoutes(): Promise<Route[]> {
	try {
		const routes = await sql<Route[]>`
			SELECT * FROM main.route
		`;
		return routes;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getStaff(): Promise<Staff[]> {
	try {
		const staff = await sql<Staff[]>`
			SELECT * FROM main.staff
		`;
		return staff;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getStaffPositions(): Promise<StaffPosition[]> {
	try {
		const positions = await sql<StaffPosition[]>`
			SELECT * FROM main.staff_position
		`;
		return positions;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getStaffVehicles(): Promise<StaffVehicle[]> {
	try {
		const staffVehicles = await sql<StaffVehicle[]>`
			SELECT * FROM main.staff_vehicle
		`;
		return staffVehicles;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getTickets(): Promise<Ticket[]> {
	try {
		const tickets = await sql<Ticket[]>`
			SELECT * FROM main.ticket
		`;
		return tickets;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getTransportations(): Promise<Transportation[]> {
	try {
		const transportations = await sql<Transportation[]>`
			SELECT * FROM main.transportation
		`;
		return transportations;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getVehicles(): Promise<Vehicle[]> {
	try {
		const vehicles = await sql<Vehicle[]>`
			SELECT * FROM main.vehicle
		`;
		return vehicles;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getVehicleRoutes(): Promise<VehicleRoute[]> {
	try {
		const vehicleRoutes = await sql<VehicleRoute[]>`
			SELECT * FROM main.vehicle_route
		`;
		return vehicleRoutes;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getFeedbacks(): Promise<Feedback[]> {
	try {
		const feedbacks = await sql<Feedback[]>`
			SELECT * FROM main.feedback
		`;
		return feedbacks;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getLongestRoutes() : Promise<Route[]> {
	try {
		const routes = await sql<Route[]>`
			SELECT * FROM main.route WHERE distance = (SELECT MAX(distance) FROM main.route)
		`;
		return routes;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getShortestRoutes() : Promise<Route[]> {
	try {
		const routes = await sql<Route[]>`
			SELECT * FROM main.route WHERE distance = (SELECT MIN(distance) FROM main.route)
		`;
		return routes;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getPassengersWithFeedback() : Promise<Passenger[]> {
	try {
		const routes = await sql<Passenger[]>`
			SELECT DISTINCT * FROM main.passenger JOIN main.feedback ON main.passenger.id = main.feedback.passenger_id
		`;
		return routes;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function getLocationsOf(categoryId: string): Promise<Location[]> {
	try {
		const locations = await sql<Location[]>`
			SELECT * FROM main.location WHERE category_id = ${categoryId}
		`;
		return locations;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}
// id: string;
// name: string;
// location_start_id: string;
// location_destiny_id: string;
// distance: number;
// created_at: Date;
export async function getRoutesOf(categoryId: string): Promise<Route[]> {
	try {
		const routes = await sql<Route[]>`
			SELECT main.route.id, main.route.name, main.route.location_start_id, main.route.location_destiny_id, main.route.distance, main.route.created_at, main.location.id AS locId, main.location.category_id FROM main.route JOIN main.location ON main.route.location_start_id = main.location.id WHERE main.location.category_id = ${categoryId}
		`;
		return routes;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertTransportCategory(category : string): Promise<TransportCategory[]> {
	try {
		const transportCategory = await sql<TransportCategory[]>`
			INSERT INTO main.transport_category(name) VALUES(${category}) RETURNING id, name, created_at
		`;
		return transportCategory;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertStaffPosition(staffPosition: StaffPosition): Promise<StaffPosition[]> {
	try {
		const insertedStaffPosition = await sql<StaffPosition[]>`
			INSERT INTO main.staff_position(name, description, salary) VALUES(${staffPosition.name}, ${staffPosition.description}, ${staffPosition.salary}) RETURNING id, name
		`;
		return insertedStaffPosition;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertLocation(location: Location): Promise<Location[]> {
	try {
		const insertedLocation = await sql<Location[]>`
		INSERT INTO main.location(address, category_id, is_station) VALUES(${location.address}, ${location.category_id}, ${location.is_station}) RETURNING id, address
		`;
		return insertedLocation;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertRoute(route: Route): Promise<Route[]> {
	try {
		const insertedRoute = await sql<Route[]>`
			INSERT INTO main.route(name, location_start_id, location_destiny_id, distance)
			VALUES (${route.name}, ${route.location_start_id},
			${route.location_destiny_id}, ${route.distance})
			RETURNING id, name
		`;
		return insertedRoute;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertVehicle(vehicle: Vehicle): Promise<Vehicle[]> {
	try {
		const insertedVehicle = await sql<Vehicle[]>`
			INSERT INTO main.vehicle(category_id, manufacturer, model, year, capacity)
			VALUES (${vehicle.category_id}, ${vehicle.manufacturer},
			${vehicle.model}, ${vehicle.year}, ${vehicle.capacity})
			RETURNING id, manufacturer, model
		`;
		return insertedVehicle;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertPassenger(passenger: Passenger): Promise<Passenger[]> {
	try {
		const insertedPassenger = await sql<Passenger[]>`
			INSERT INTO main.passenger(name, email, phone)
			VALUES (${passenger.name}, ${passenger.email},
			${passenger.phone})
			RETURNING id, name, email, phone
		`;
		return insertedPassenger;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertTicket(ticket: Ticket): Promise<Ticket[]> {
	try {
		const insertedTicket = await sql<Ticket[]>`
		INSERT INTO main.ticket (price)
		VALUES (${ticket.price})
		RETURNING *
		`;
		return insertedTicket;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertPayment(payment: Payment, quantity: number): Promise<Payment[]> {
	try {
		const insertedPayments: Payment[] = [];
		for (let i = 0; i < quantity; i++) {
		const insertedPayment = await sql<Payment[]>`
			INSERT INTO main.payment (ticket_id, method, date, passenger_id)
			VALUES (${payment.ticket_id}, ${payment.method}, ${payment.date}, ${payment.passenger_id})
			RETURNING *
		`;

		insertedPayments.push(...insertedPayment);
		}
		return insertedPayments;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertStaff(staff: Staff): Promise<Staff[]> {
	try {
		const insertedStaff = await sql<Staff[]>`
		INSERT INTO main.staff (name, position_id)
		VALUES (${staff.name}, ${staff.position_id})
		RETURNING *
		`;
		return insertedStaff;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertFeedback(feedback: Feedback): Promise<Feedback[]> {
	try {
		const insertedFeedback = await sql<Feedback[]>`
		INSERT INTO main.feedback (passenger_id, date, comment, rating)
		VALUES (${feedback.passenger_id}, ${feedback.date}, ${feedback.comment}, ${feedback.rating})
		RETURNING *
		`;
		return insertedFeedback;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertVehicleRoute(vehicleRoute: VehicleRoute): Promise<VehicleRoute[]> {
	try {
		const insertedVehicleRoute = await sql<VehicleRoute[]>`
		INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end)
		VALUES (${vehicleRoute.vehicle_id}, ${vehicleRoute.route_id}, ${vehicleRoute.time_init}, ${vehicleRoute.time_end})
		RETURNING *
		`;
		return insertedVehicleRoute;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertTransportation(transportation: Transportation): Promise<Transportation[]> {
	try {
		const insertedTransportation = await sql<Transportation[]>`
		INSERT INTO main.transportation (date, passenger_id, vehicle_id)
		VALUES (${transportation.date}, ${transportation.passenger_id}, ${transportation.vehicle_id})
		RETURNING *
		`;
		return insertedTransportation;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}

export async function insertStaffVehicle(staffVehicle: StaffVehicle): Promise<StaffVehicle[]> {
	try {
		const insertedStaffVehicle = await sql<StaffVehicle[]>`
		INSERT INTO main.staff_vehicle (vehicle_id, staff_id, shift_start, shift_finish)
		VALUES (${staffVehicle.vehicle_id}, ${staffVehicle.staff_id}, ${staffVehicle.shift_start}, ${staffVehicle.shift_finish})
		RETURNING *
		`;
		return insertedStaffVehicle;
	} catch (error) {
		throw new Error("Error executing database query: " + error);
	}
}
