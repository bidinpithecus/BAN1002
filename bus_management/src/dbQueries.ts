import { sql } from "./dbConnection";
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

/*
Liste todas as rotas ordenadas por distância em ordem decrescente
	SELECT * FROM main.route ORDER BY distance DESC;

Qual é o número total de passageiros que deram feedback?
	SELECT COUNT(DISTINCT passenger_id) AS total_passengers FROM main.feedback;

Liste o nome e a descrição de todas as posições de funcionários, agrupadas por categoria de transporte.
	SELECT tc.name AS category_name, sp.name AS position_name, sp.description
	FROM main.transport_category tc
	INNER JOIN main.staff_position sp ON tc.id = sp.category_id
	ORDER BY tc.name;

Liste todas as rotas em que a distância é maior que a média das distâncias de todas as rotas.
	SELECT *
	FROM main.route
	WHERE distance > (SELECT AVG(distance) FROM main.route);

Qual é o veículo com a maior capacidade?
	SELECT *
	FROM main.vehicle
	WHERE capacity = (SELECT MAX(capacity) FROM main.vehicle);

Liste todos os passageiros que fizeram uma viagem em um veículo fabricado no ano de 2023.
	SELECT p.*
	FROM main.passenger p
	INNER JOIN main.transportation t ON p.id = t.passenger_id
	INNER JOIN main.vehicle v ON t.vehicle_id = v.id
	WHERE v.year = 2023;

Qual é o salário médio dos funcionários que trabalham com veículos fabricados pela empresa "ABC Motors"?
	SELECT AVG(sp.salary) AS average_salary
	FROM main.staff_position sp
	INNER JOIN main.staff s ON sp.id = s.position_id
	INNER JOIN main.staff_vehicle sv ON s.id = sv.staff_id
	INNER JOIN main.vehicle v ON sv.vehicle_id = v.id
	WHERE v.manufacturer = 'ABC Motors';

Liste todas as rotas juntamente com o nome do veículo e o nome do motorista que está associado a cada rota.
	SELECT r.name AS route_name, v.manufacturer AS vehicle_manufacturer, s.name AS driver_name
	FROM main.route r
	INNER JOIN main.vehicle_route vr ON r.id = vr.route_id
	INNER JOIN main.vehicle v ON vr.vehicle_id = v.id
	INNER JOIN main.staff_vehicle sv ON v.id = sv.vehicle_id
	INNER JOIN main.staff s ON sv.staff_id = s.id;

Qual é o número total de passageiros que fizeram uma viagem usando um veículo fabricado no ano de 2022?
	SELECT COUNT(DISTINCT t.passenger_id) AS total_passengers
	FROM main.transportation t
	INNER JOIN main.vehicle v ON t.vehicle_id = v.id
	WHERE v.year = 2022;
*/