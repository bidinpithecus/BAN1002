import { getRoutes, getLongestRoutes, getShortestRoutes, getLocations, getStations, getPassengers, getPassengersWithFeedback, getStaff, getVehicles, insertTransportCategory, insertStaffPosition, getTransportCategories, insertLocation, insertRoute, insertVehicle, getTransportations, insertPassenger, insertTicket, insertPayment, insertStaff, insertVehicleRoute, insertTransportation, getStaffPositions, insertStaffVehicle, insertFeedback, getTickets, getLocationsOf, getRoutesOf, getPassengersWithMaxTravels, getDriversOnlyOfBus, getEmployeesWithLongTravels, getVehiclesWithMaxTravels, getTrainsOfAllStations } from "./dbQueries";
import { closeConnection } from "./dbConnection";
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
import * as readline from "readline";

function clearScreen(session: string) {
	// Check if the current environment supports ANSI escape codes
	const isSupported = process.stdout.isTTY;

	if (isSupported) {
		// Clear the console using ANSI escape codes
		process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
	} else {
		// Fallback for environments that do not support ANSI escape codes
		console.clear();
	}
	console.log("=== TRANSPORTAR ===");
	console.log(`=== ${session} ===`);
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function createTime(hours: number, minutes: number, seconds: number): Date {
	const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	return new Date(`1970-01-01T${timeString}`);
  }


async function menuGet(): Promise<void> {
	clearScreen("Busca de dados");
	let option: number = 1;
	const answer: string = await new Promise<string>((resolve) => {
		rl.question(
			"\tVoltar? Digite 0.\n\tBuscar rotas? Digite 1.\n\tBuscar paradas? Digite 2.\n\tBuscar passageiros? Digite 3\n\tBuscar funcionários? Digite 4\n\tBuscar veículos? Digite 5.\n\t", (input) => {
				resolve(input);
			}
		);
	});

	let secondAnswer: string;
	let secondOption: number;

	option = parseInt(answer);
	switch(option) {
	// Exit
	case 0:
		return;
	// Routes
	case 1:
		secondAnswer = await new Promise<string>(resolve => rl.question("\n\t\tVoltar? Digite 0.\n\t\tBuscar todas? Digite 1.\n\t\tBuscar mais longas? Digite 2.\n\t\tBuscar mais curtas? Digite 3.\n\t\t", input => resolve(input)));
		secondOption = parseInt(secondAnswer);
		switch (secondOption) {
		case 0:
		default:
			break;
		case 1:
			try {
				const routes = await getRoutes();
				routes.forEach((route, index) => {
					console.log(`\t\tParada ${index}:\n\t\t\tNome: ${route.name}\n\t\t\tPartida: ${route.location_start_id}\n\t\t\tChegada: ${route.location_destiny_id}\n\t\t\tDistância: ${route.distance}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 2:
			try {
				const routes = await getLongestRoutes();
				routes.forEach((route, index) => {
					console.log(`\t\tParada ${index}:\n\t\t\tNome: ${route.name}\n\t\t\tPartida: ${route.location_start_id}\n\t\t\tChegada: ${route.location_destiny_id}\n\t\t\tDistância: ${route.distance}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 3:
			try {
				const routes = await getShortestRoutes();
				routes.forEach((route, index) => {
					console.log(`\t\tParada ${index}:\n\t\t\tNome: ${route.name}\n\t\t\tPartida: ${route.location_start_id}\n\t\t\tChegada: ${route.location_destiny_id}\n\t\t\tDistância: ${route.distance}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		}
		break;
	// Stops
	case 2:
		secondAnswer = await new Promise<string>(resolve => rl.question("\n\t\tVoltar? Digite 0.\n\t\tBuscar todas? Digite 1.\n\t\tBuscar apenas estações? Digite 2.\n\t\t", input => resolve(input)));
		secondOption = parseInt(secondAnswer);
		switch (secondOption) {
		case 0:
			break;
		case 1:
			try {
				const stops = await getLocations();
				stops.forEach((stop, index) => {
					console.log(`\t\tParada ${index}:\n\t\t\tId: ${stop.id}\n\t\t\tNome: ${stop.address}\n\t\t\tTipo: ${stop.category_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 2:
			try {
				const stops = await getStations();
				stops.forEach((stop, index) => {
					console.log(`\t\tEstação ${index}:\n\t\t\tId: ${stop.id}\n\t\t\tNome: ${stop.address}\n\t\t\tTipo: ${stop.category_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		}
		break;
	// Passengers
	case 3:
		secondAnswer = await new Promise<string>(resolve => rl.question("\n\t\tVoltar? Digite 0.\n\t\tBuscar todos? Digite 1.\n\t\tBuscar apenas os que deram algum feedback? Digite 2.\n\t\tBuscar passageiros que fizeram mais viagens? Digite 3.\n\t\t", input => resolve(input)));
		secondOption = parseInt(secondAnswer);
		switch (secondOption) {
		case 0:
			break;
		case 1:
			try {
				const passengers = await getPassengers();
				passengers.forEach((passenger, index) => {
					console.log(`\t\tPassageiro ${index}:\n\t\t\tId: ${passenger.id}\n\t\t\tNome: ${passenger.name}\n\t\t\tTipo: ${passenger.email}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 2:
			try {
				const passengers = await getPassengersWithFeedback();
				passengers.forEach((passenger, index) => {
					console.log(`\t\tPassageiro ${index}:\n\t\t\tId: ${passenger.id}\n\t\t\tNome: ${passenger.name}\n\t\t\tEmail: ${passenger.email}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 3:
			try {
				const passengers = await getPassengersWithMaxTravels();
				passengers.forEach((passenger, index) => {
					console.log(`\t\tPassageiro ${index}:\n\t\t\tId: ${passenger.id}\n\t\t\tNome: ${passenger.name}\n\t\t\tEmail: ${passenger.email}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		}
		break;
	// Staff
	case 4:
		secondAnswer = await new Promise<string>(resolve => rl.question("\n\t\tVoltar? Digite 0.\n\t\tBuscar todos? Digite 1.\n\t\tBuscar os motoristas que dirigiram apenas ônibus? Digite 2.\n\t\tBuscar funcionários que fizeram apenas rotas com distâncias maiores de 9km? Digite 3.\n\t\t", input => resolve(input)));
		secondOption = parseInt(secondAnswer);
		switch (secondOption) {
		case 0:
			break;
		case 1:
			try {
				const staff = await getStaff();
				staff.forEach((employee, index) => {
					console.log(`\t\tFuncionário ${index}:\n\t\t\tId: ${employee.id}\n\t\t\tNome: ${employee.name}\n\t\t\tCargo: ${employee.position_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 2:
			try {
				const staff = await getDriversOnlyOfBus();
				staff.forEach((employee, index) => {
					console.log(`\t\tFuncionário ${index}:\n\t\t\tId: ${employee.id}\n\t\t\tNome: ${employee.name}\n\t\t\tCargo: ${employee.position_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 3:
			try {
				const staff = await getEmployeesWithLongTravels();
				staff.forEach((employee, index) => {
					console.log(`\t\tFuncionário ${index}:\n\t\t\tId: ${employee.id}\n\t\t\tNome: ${employee.name}\n\t\t\tCargo: ${employee.position_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		}
		break;
	// Vehicles
	case 5:
		secondAnswer = await new Promise<string>(resolve => rl.question("\n\t\tVoltar? Digite 0.\n\t\tBuscar todos? Digite 1.\n\t\tBuscar os que mais fizeram viagens? Digite 2.\n\t\tBuscar apenas trens que passaram por todas as estações? Digite 3.\n\t\t", input => resolve(input)));
		secondOption = parseInt(secondAnswer);
		switch (secondOption) {
		case 0:
			break;
		case 1:
			try {
				const vehicles = await getVehicles();
				vehicles.forEach((vehicle, index) => {
					console.log(`\t\tVeículo ${index}:\n\t\t\tId: ${vehicle.id}\n\t\t\tMarca: ${vehicle.manufacturer}\n\t\t\tModelo: ${vehicle.model}\n\t\t\tAno: ${vehicle.year}\n\t\t\tCapacidade: ${vehicle.capacity}\n\t\t\tCategoria: ${vehicle.category_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 2:
			try {
				const vehicles = await getVehiclesWithMaxTravels();
				vehicles.forEach((vehicle, index) => {
					console.log(`\t\tVeículo ${index}:\n\t\t\tId: ${vehicle.id}\n\t\t\tMarca: ${vehicle.manufacturer}\n\t\t\tModelo: ${vehicle.model}\n\t\t\tAno: ${vehicle.year}\n\t\t\tCapacidade: ${vehicle.capacity}\n\t\t\tCategoria: ${vehicle.category_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 3:
			try {
				const vehicles = await getTrainsOfAllStations();
				vehicles.forEach((vehicle, index) => {
					console.log(`\t\tVeículo ${index}:\n\t\t\tId: ${vehicle.id}\n\t\t\tMarca: ${vehicle.manufacturer}\n\t\t\tModelo: ${vehicle.model}\n\t\t\tAno: ${vehicle.year}\n\t\t\tCapacidade: ${vehicle.capacity}\n\t\t\tCategoria: ${vehicle.category_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		}
		break;
	};

	await new Promise<void>((resolve) => {
		rl.question("Press Enter to continue...", () => {
			resolve();
		});
	});
}

async function menuInsert(): Promise<void> {
	let nameAnswer: string;
	let descriptionAnswer: string;
	let salaryAnswer: string;
	let addressAnswer: string;
	let categoryIndexAnswer: string;
	let distanceAnswer: string;
	let isStationAnswer: string;
	let dateAnswer: string;
	let passengerIdAnswer: string;
	let vehicleIdAnswer: string;
	let routeIdAnswer: string;
	let staffIdAnswer: string;
	let categoryIndex: number;
	let passengerIndex: number;
	let vehicleIndex: number;
	let routeIndex: number;
	let staffIndex: number;
	const categories = await getTransportCategories();
	const passengers = await getPassengers();
	const locations = await getLocations();
	const positions = await getStaffPositions();
	const tickets = await getTickets();
	const vehicles = await getVehicles();
	const routes = await getRoutes();
	const employees = await getStaff();
	clearScreen("Inserção de dados");
	let option: number = 1;
	const answer: string = await new Promise<string>((resolve) => {
		rl.question(
			"\tVoltar? Digite 0.\n\tInserir categorias de transporte? Digite 1.\n\tInserir cargos? Digite 2.\n\tInserir paradas? Digite 3\n\tInserir Rotas? Digite 4\n\tInserir veículos? Digite 5.\n\tInserir passageiros? Digite 6.\n\tInserir bilhete? Digite 7.\n\tInserir pagamento? Digite 8.\n\tInserir funcionário? Digite 9.\n\tInserir feedback? Digite 10.\n\tInserir rotas de veículos? Digite 11.\n\tInserir o transporte de um passageiro? Digite 12.\n\tInserir turnos de funcionários? Digite 13.\n\t", (input) => {
				resolve(input);
			}
		);
	});

	option = parseInt(answer);
	switch(option) {
	// Exit
	case 0:
	default:
		return;
	// Transport category
    case 1:
		const answer: string = await new Promise<string>((resolve) => {
			rl.question("\tNome: ", (input) => {
				resolve(input);
			});
		});

		const created = await insertTransportCategory(answer);
		console.log(`\tCategoria criada:\n\t\tId: ${created[0].id}\n\t\tNome: ${created[0].name}`);
		break;
    // Staff position
	case 2:
		const staffPosition: StaffPosition = {
			id: "",
			name: "",
			description: "",
			salary: 0,
			created_at: new Date(),
		};

		nameAnswer = await new Promise<string>((resolve) => {
			rl.question("\tNome: ", (input) => {
				resolve(input);
			});
		});
		staffPosition.name = nameAnswer;

		descriptionAnswer = await new Promise<string>((resolve) => {
			rl.question("\tDescrição: ", (input) => {
				resolve(input);
			});
		});
		staffPosition.description = descriptionAnswer;

		salaryAnswer = await new Promise<string>((resolve) => {
			rl.question("\tSalário: ", (input) => {
				resolve(input);
			});
		});
		staffPosition.salary = parseFloat(salaryAnswer);

		const createdPosition = await insertStaffPosition(staffPosition);
		console.log(
		  	`\tCargo criado:\n\t\tId: ${createdPosition[0].id}\n\t\tNome: ${createdPosition[0].name}`
		);
		break;
	// Location
	case 3:
		const location: Location = {
			id: "",
			address: "",
			category_id: "",
			created_at: new Date(),
			is_station: false,
		};

		addressAnswer = await new Promise<string>((resolve) => {
			rl.question("\tEndereço: ", (input) => {
				resolve(input);
			});
		});
		location.address = addressAnswer;

		console.log("\tCategorias:");
		categories.forEach((category, index) => {
		  	console.log(`\t[${index + 1}] ID: ${category.id}\tName: ${category.name}`);
		});

		categoryIndexAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice da categoria para adicioná-la: ", (input) => {
				resolve(input);
			});
		});

		categoryIndex = parseInt(categoryIndexAnswer) - 1;
		if (isNaN(categoryIndex) || categoryIndex < 0 || categoryIndex >= categories.length) {
			console.log("\tÍndice inválido!");
			break;
		}

		location.category_id = categories[categoryIndex].id;

		isStationAnswer = await new Promise<string>((resolve) => {
			rl.question("\tÉ um terminal/estação? (V/F): ", (input) => {
				resolve(input);
			});
		});
		location.is_station = (isStationAnswer.toLowerCase() === "v");

		const createdLocation = await insertLocation(location);
		console.log(
		  	`\tParada criada:\n\t\tId: ${createdLocation[0].id}\n\t\tNome: ${createdLocation[0].address}`
		);
		break;
    // Route
	case 4:
		const route: Route = {
			id: "",
			name: "",
			location_start_id: "",
			location_destiny_id: "",
			distance: 0,
			created_at: new Date(),
		};

		nameAnswer = await new Promise<string>((resolve) => {
			rl.question("\tNome: ", (input) => {
				resolve(input);
			});
		});
		route.name = nameAnswer;

		console.log("\tLocalizações:");
		locations.forEach((location, index) => {
		  	console.log(`\t[${index + 1}] Id: ${location.id}\tNome: ${location.address}`);
		});

		const startLocationIndexAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice da localização inicial: ", (input) => {
				resolve(input);
			});
		});

		const startLocationIndex = parseInt(startLocationIndexAnswer) - 1;
		if (isNaN(startLocationIndex) || startLocationIndex < 0 || startLocationIndex >= locations.length) {
			console.log("\tÍndice inválido!");
			break;
		}
		route.location_start_id = locations[startLocationIndex].id;

		const availableLocations = await getLocationsOf(locations[startLocationIndex].category_id);

		console.log("\tLocalizações:");
		availableLocations.forEach((location, index) => {
		  	console.log(`\t[${index + 1}] Id: ${location.id}\tNome: ${location.address}`);
		});

		const destinyLocationIndexAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice da localização final: ", (input) => {
				resolve(input);
			});
		});

		const destinyLocationIndex = parseInt(destinyLocationIndexAnswer) - 1;
		if (isNaN(destinyLocationIndex) || destinyLocationIndex < 0 || destinyLocationIndex >= availableLocations.length) {
			console.log("\tÍndice inválido!");
			break;
		}

		route.location_destiny_id = availableLocations[destinyLocationIndex].id;

		distanceAnswer = await new Promise<string>((resolve) => {
			rl.question("\tDistância: ", (input) => {
				resolve(input);
			});
		});
		route.distance = parseFloat(distanceAnswer);

		const createdRoute = await insertRoute(route);
		console.log(
		  	`\tRota criada:\n\t\tId: ${createdRoute[0].id}\n\t\tNome: ${createdRoute[0].name}`
		);
		break;
    // Vehicle
	case 5:
		const vehicle: Vehicle = {
			id: "",
			category_id: "",
			manufacturer: "",
			model: "",
			year: 0,
			capacity: 0,
			created_at: new Date(),
		};

		const manufacturerAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tFabricante: ", (input) => {
				resolve(input);
			});
		});
		vehicle.manufacturer = manufacturerAnswer;

		const modelAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tModelo: ", (input) => {
				resolve(input);
			});
		});
		vehicle.model = modelAnswer;

		const yearAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tAno: ", (input) => {
				resolve(input);
			});
		});
		vehicle.year = parseInt(yearAnswer);

		const capacityAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tCapacidade: ", (input) => {
				resolve(input);
			});
		});
		vehicle.capacity = parseInt(capacityAnswer);

		console.log("\tCategorias:");
		categories.forEach((category, index) => {
			console.log(`\t[${index + 1}] Id: ${category.id}\tNome: ${category.name}`);
		});

		categoryIndexAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice da categoria: ", (input) => {
				resolve(input);
			});
		});

		categoryIndex = parseInt(categoryIndexAnswer) - 1;
			if (isNaN(categoryIndex) || categoryIndex < 0 || categoryIndex >= categories.length) {
			console.log("\tÍndice inválido!");
			break;
		}

		vehicle.category_id = categories[categoryIndex].id;

		const createdVehicle = await insertVehicle(vehicle);
		console.log(
		  	`\tVeículo criado:\n\t\tId: ${createdVehicle[0].id}\n\t\tFabricante: ${createdVehicle[0].manufacturer}\n\t\tModelo: ${createdVehicle[0].model}`
		);
		break;

    // Passenger
	case 6:
		const passenger: Passenger = {
			id: "",
			name: "",
			email: "",
			phone: "",
			created_at: new Date(),
		};

		nameAnswer = await new Promise<string>((resolve) => {
			rl.question("\tNome: ", (input) => {
				resolve(input);
			});
		});
		passenger.name = nameAnswer;

		const emailAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tEmail: ", (input) => {
				resolve(input);
			});
		});
		passenger.email = emailAnswer;

		const phoneAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tTelefone: ", (input) => {
				resolve(input);
			});
		});
		passenger.phone = phoneAnswer;

		const createdPassenger = await insertPassenger(passenger);
			console.log(
			`\tPassageiro criado:\n\t\tId: ${createdPassenger[0].id}\n\t\tNome: ${createdPassenger[0].name}\n\t\tEmail: ${createdPassenger[0].email}\n\t\tTelefone: ${createdPassenger[0].phone}`
			);
		break;
    // Ticket
	case 7:
		const ticket: Ticket = {
			id: "",
			price: 0,
			created_at: new Date(),
		};

		const priceAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tPreço: ", (input) => {
				resolve(input);
			});
		});
		ticket.price = parseFloat(priceAnswer);

		const createdTicket = await insertTicket(ticket);
		console.log(
		  	`\tPassagem criada:\n\t\tId: ${createdTicket[0].id}\n\t\tPreço: ${createdTicket[0].price}`
		);
		break;
    // Payment
	case 8:
		const payment: Payment = {
			id: "",
			ticket_id: "",
			method: "",
			date: new Date(),
			passenger_id: "",
			created_at: new Date(),
		};

		console.log("\tPasses:");
		tickets.forEach((ticket, index) => {
		  	console.log(`\t[${index + 1}] Id: ${ticket.id}\tPreço: ${ticket.price}`);
		});

		const ticketIndexAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do passe: ", (input) => {
				resolve(input);
			});
		});

		const ticketIndex = parseInt(ticketIndexAnswer) - 1;
		if (isNaN(ticketIndex) || ticketIndex < 0 || ticketIndex >= tickets.length) {
			console.log("\tÍndice inválido!");
			break;
		}
		payment.ticket_id = tickets[ticketIndex].id;

		const methodAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tInsira o método de pagamento: ", (input) => {
				resolve(input);
			});
		});
		payment.method = methodAnswer;

		console.log("\tPassageiros:");
		passengers.forEach((passenger, index) => {
		  	console.log(`\t[${index + 1}] Id: ${passenger.id}\tNome: ${passenger.name}\tEmail: ${passenger.email}`);
		});

		passengerIdAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do passageiro: ", (input) => {
				resolve(input);
			});
		});

		passengerIndex = parseInt(passengerIdAnswer) - 1;
		if (isNaN(passengerIndex) || passengerIndex < 0 || passengerIndex >= passengers.length) {
		  	console.log("\tÍndice inválido!");
		  	break;
		}
		payment.passenger_id = passengers[passengerIndex].id;

		const quantityAnswer = await new Promise<string>(resolve => {
			rl.question("\tInsira a quantidade de passagens desejada: ", input => {
				resolve(input);
			});
		});

		const quantity = parseInt(quantityAnswer);

		if (isNaN(quantity) || quantity < 0) {
			console.log("\tQuantidade inválida!");
			break;
		}

		const createdPayments = await insertPayment(payment, quantity);
		console.log("\tPassagens criadas:");
		createdPayments.forEach((payment, index) => {
			console.log(`\t\tPassagem ${index}:\n\t\t\tId: ${payment.id}\n\t\t\tMétodo: ${payment.method}`);
		});

		break;
	// Staff
	case 9:
		const staff: Staff = {
			id: "",
			name: "",
			position_id: "",
			created_at: new Date(),
		};

		const staffNameAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tNome: ", (input) => {
				resolve(input);
			});
		});
		staff.name = staffNameAnswer;
		console.log("\tCargos:");
		positions.forEach((position, index) => {
		  	console.log(`\t[${index + 1}] ID: ${position.id}\tNome: ${position.name}`);
		});

		const positionIndexAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do cargo: ", (input) => {
				resolve(input);
			});
		});

		const positionIndex = parseInt(positionIndexAnswer) - 1;
		if (isNaN(positionIndex) || positionIndex < 0 || positionIndex >= positions.length) {
			console.log("\tÍndice inválido!");
			break;
		}

		staff.position_id = positions[positionIndex].id;

		const createdStaff = await insertStaff(staff);
		console.log(
		  	`\tFuncionário criado:\n\t\tId: ${createdStaff[0].id}\n\t\tNome: ${createdStaff[0].name}`
		);
		break;
    // Feedback
	case 10:
		const feedback: Feedback = {
			id: "",
			passenger_id: "",
			date: new Date(),
			comment: null,
			rating: 0,
			created_at: new Date(),
		};

		console.log("\tPassageiros:");
		passengers.forEach((passenger, index) => {
		  	console.log(`\t[${index + 1}] Id: ${passenger.id}\tNome: ${passenger.name}\tEmail: ${passenger.email}`);
		});

		passengerIdAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do passageiro: ", (input) => {
				resolve(input);
			});
		});

		passengerIndex = parseInt(passengerIdAnswer) - 1;
		if (isNaN(passengerIndex) || passengerIndex < 0 || passengerIndex >= passengers.length) {
		  	console.log("\tÍndice inválido!");
		  	break;
		}
		feedback.passenger_id = passengers[passengerIndex].id;

		const ratingAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tNota (0-5): ", (input) => {
				resolve(input);
			});
		});
		const rating = parseInt(ratingAnswer);

		if (isNaN(rating) || rating < 0 || rating > 5) {
			console.log("\tNota inválida!");
			break;
		}
		feedback.rating = rating;

		const commentAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tComentário (opcional): ", (input) => {
				resolve(input);
			});
		});
		feedback.comment = commentAnswer || null;

		const createdFeedback = await insertFeedback(feedback);
		console.log(
		  	`\tFeedback criado:\n\t\tId: ${createdFeedback[0].id}\n\t\tPassageiro: ${createdFeedback[0].passenger_id}\n\t\tNota: ${createdFeedback[0].rating}`
		);
		break;
    // Vehicle route
	case 11:
		const vehicleRoute: VehicleRoute = {
			id: "",
			vehicle_id: "",
			route_id: "",
			time_init: new Date(),
			time_end: new Date(),
			created_at: new Date(),
		};

		console.log("\tVeículos:");
		vehicles.forEach((vehicle, index) => {
		  	console.log(`\t[${index + 1}] Id: ${vehicle.id}\tMarca: ${vehicle.manufacturer}\tModelo: ${vehicle.model}`);
		});

		vehicleIdAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do veículo: ", (input) => {
				resolve(input);
			});
		});

		vehicleIndex = parseInt(vehicleIdAnswer) - 1;
		if (isNaN(vehicleIndex) || vehicleIndex < 0 || vehicleIndex >= vehicles.length) {
		  	console.log("\tÍndice inválido!");
		  	break;
		}
		vehicleRoute.vehicle_id = vehicles[vehicleIndex].id;

		const availableRoutes = await getRoutesOf(vehicles[vehicleIndex].category_id);

		console.log("\tRotas:");
		availableRoutes.forEach((route, index) => {
		  	console.log(`\t[${index + 1}] Id: ${route.id}\tParada inicial Id: ${route.location_start_id}\tParada final Id: ${route.location_destiny_id}`);
		});

		routeIdAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice da rota: ", (input) => {
				resolve(input);
			});
		});

		routeIndex = parseInt(routeIdAnswer) - 1;
		if (isNaN(routeIndex) || routeIndex < 0 || routeIndex >= availableRoutes.length) {
		  	console.log("\tÍndice inválido!");
		  	break;
		}
		vehicleRoute.route_id = availableRoutes[routeIndex].id;

		const timeInitAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tHora inicial (hh:mm:ss): ", (input) => {
			  resolve(input);
			});
		  });

		let [hours, minutes, seconds] = timeInitAnswer.split(':').map(Number);
		vehicleRoute.time_init = createTime(hours, minutes, seconds);

		const timeEndAnswer: string = await new Promise<string>((resolve) => {
		rl.question("\tHora final (hh:mm:ss): ", (input) => {
			resolve(input);
		});
		});

		[hours, minutes, seconds] = timeEndAnswer.split(':').map(Number);
		vehicleRoute.time_end = createTime(hours, minutes, seconds);

		const createdVehicleRoute = await insertVehicleRoute(vehicleRoute);
		console.log(
		  	`\tRota veículo:\n\t\tID: ${createdVehicleRoute[0].id}\n\t\tVeículo: ${createdVehicleRoute[0].vehicle_id}\n\t\tRota: ${createdVehicleRoute[0].route_id}`
		);
		break;
    // Transportation
	case 12:
		const transportation: Transportation = {
			id: "",
			date: new Date(),
			passenger_id: "",
			vehicle_id: "",
			created_at: new Date(),
		};

		console.log("\tPassageiros:");
		passengers.forEach((passenger, index) => {
		  	console.log(`\t[${index + 1}] Id: ${passenger.id}\tNome: ${passenger.name}\tEmail: ${passenger.email}`);
		});

		passengerIdAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do passageiro: ", (input) => {
				resolve(input);
			});
		});

		passengerIndex = parseInt(passengerIdAnswer) - 1;
		if (isNaN(passengerIndex) || passengerIndex < 0 || passengerIndex >= passengers.length) {
		  	console.log("\tÍndice inválido!");
		  	break;
		}
		transportation.passenger_id = passengers[passengerIndex].id;

		console.log("\tVeículos:");
		vehicles.forEach((vehicle, index) => {
		  	console.log(`\t[${index + 1}] Id: ${vehicle.id}\tMarca: ${vehicle.manufacturer}\tModelo: ${vehicle.model}`);
		});

		vehicleIdAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do veículo: ", (input) => {
				resolve(input);
			});
		});

		vehicleIndex = parseInt(vehicleIdAnswer) - 1;
		if (isNaN(vehicleIndex) || vehicleIndex < 0 || vehicleIndex >= vehicles.length) {
		  	console.log("\tÍndice inválido!");
		  	break;
		}
		transportation.vehicle_id = vehicles[vehicleIndex].id;

		dateAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira a data (yyyy-mm-dd): ", (input) => {
				resolve(input);
			});
		});
		transportation.date = new Date(dateAnswer);

		const createdTransportation = await insertTransportation(transportation);
		console.log(
		  	`\tTransporte criado:\n\t\tId: ${createdTransportation[0].id}\n\t\tPassageiro: ${createdTransportation[0].passenger_id}\n\t\tVeículo: ${createdTransportation[0].vehicle_id}`
		);
		break;
    // Staff vehicle
	case 13:
		const staffVehicle: StaffVehicle = {
			id: "",
			vehicle_id: "",
			staff_id: "",
			shift_start: new Date(),
			shift_finish: new Date(),
			created_at: new Date(),
		};

		console.log("\tVeículos:");
		vehicles.forEach((vehicle, index) => {
		  	console.log(`\t[${index + 1}] Id: ${vehicle.id}\tMarca: ${vehicle.manufacturer}\tModelo: ${vehicle.model}`);
		});

		vehicleIdAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do veículo: ", (input) => {
				resolve(input);
			});
		});

		vehicleIndex = parseInt(vehicleIdAnswer) - 1;
		if (isNaN(vehicleIndex) || vehicleIndex < 0 || vehicleIndex >= vehicles.length) {
		  	console.log("\tÍndice inválido!");
		  	break;
		}
		staffVehicle.vehicle_id = vehicles[vehicleIndex].id;

		console.log("\tFuncionários:");
		employees.forEach((employee, index) => {
		  	console.log(`\t[${index + 1}] Id: ${employee.id}\tNome: ${employee.name}\tCargo: ${employee.position_id}`);
		});

		staffIdAnswer = await new Promise<string>((resolve) => {
			rl.question("\tInsira o índice do veículo: ", (input) => {
				resolve(input);
			});
		});

		staffIndex = parseInt(staffIdAnswer) - 1;
		if (isNaN(staffIndex) || staffIndex < 0 || staffIndex >= employees.length) {
		  	console.log("\tÍndice inválido!");
		  	break;
		}
		staffVehicle.staff_id = employees[staffIndex].id;

		const shiftStartAnswer: string = await new Promise<string>((resolve) => {
			rl.question("\tHora inicial (hh:mm:ss): ", (input) => {
			  resolve(input);
			});
		});

		let [hoursS, minutesS, secondsS] = shiftStartAnswer.split(':').map(Number);
		staffVehicle.shift_start = createTime(hoursS, minutesS, secondsS);

		const shiftFinishAnswer: string = await new Promise<string>((resolve) => {
		rl.question("\tHora final (hh:mm:ss): ", (input) => {
			resolve(input);
			});
		});

		[hoursS, minutesS, secondsS] = shiftFinishAnswer.split(':').map(Number);
		staffVehicle.shift_finish = createTime(hoursS, minutesS, secondsS);

		const createdStaffVehicle = await insertStaffVehicle(staffVehicle);
		console.log(
		  	`\tTurno criado:\n\t\tId: ${createdStaffVehicle[0].id}\n\t\tVeículo: ${createdStaffVehicle[0].vehicle_id}\n\t\tFuncionário: ${createdStaffVehicle[0].staff_id}`
		);
		break;
	}
	await new Promise<void>((resolve) => {
		rl.question("Press Enter to continue...", () => {
			resolve();
		});
	});
}

async function menu(): Promise<void> {
	let option: number = 1;
	while (option != 0) {
		clearScreen("Menu Principal");
	  	const answer = await new Promise<string>((resolve) => {
		rl.question(
			"Opções:\n\tDeseja sair? Digite 0.\n\tBuscar dados? Digite 1.\n\tInserir dados? Digite 2.\n\t",
			(input) => {
				resolve(input);
			}
			);
		});

		option = parseInt(answer);
		switch (option) {
		case 0:
			console.log("Saindo. Até a próxima!");
			rl.close();
			return;
		case 1:
			await menuGet();
			break;
		case 2:
			await menuInsert();
			break;
		default:
			console.log("Opção inválida.");
		}
	}
}

async function main() {
	await menu();
	closeConnection();
}


main();
