import { getRoutes, getLongestRoutes, getShortestRoutes, getLocations, getStations, getPassengers, getPassengersWithFeedback, getStaff, getVehicles, insertTransportCategory, insertStaffPosition, getTransportCategories, insertLocation, insertRoute, insertVehicle, getTransportations } from "./dbQueries";
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
import {v4 as uuidv4} from 'uuid'
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
		secondAnswer = await new Promise<string>(resolve => rl.question("\n\t\tVoltar? Digite 0.\n\t\tBuscar todos? Digite 1.\n\t\tBuscar apenas os que deram algum feedback? Digite 2.\n\t\tBuscar passageiros que fizeram mais viagens? Digite 3.", input => resolve(input)));
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
		}
		case 3:
			try {
				const passengers = await getPassengersWithFeedback();
				passengers.forEach((passenger, index) => {
					console.log(`\t\tPassageiro ${index}:\n\t\t\tId: ${passenger.id}\n\t\t\tNome: ${passenger.name}\n\t\t\tEmail: ${passenger.email}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
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
				const staff = await getStaff();
				staff.forEach((employee, index) => {
					console.log(`\t\tFuncionário ${index}:\n\t\t\tId: ${employee.id}\n\t\t\tNome: ${employee.name}\n\t\t\tCargo: ${employee.position_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 3:
			try {
				const staff = await getStaff();
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
				const vehicles = await getVehicles();
				vehicles.forEach((vehicle, index) => {
					console.log(`\t\tVeículo ${index}:\n\t\t\tId: ${vehicle.id}\n\t\t\tMarca: ${vehicle.manufacturer}\n\t\t\tModelo: ${vehicle.model}\n\t\t\tAno: ${vehicle.year}\n\t\t\tCapacidade: ${vehicle.capacity}\n\t\t\tCategoria: ${vehicle.category_id}`);
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 3:
			try {
				const vehicles = await getVehicles();
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
	let nameAnswer : string;
	let descriptionAnswer : string;
	let salaryAnswer : string;
	let addressAnswer: string;
	let categoryIndexAnswer : string;
	let distanceAnswer: string;
	let isStationAnswer: string;
	let categoryIndex : number;
	const categories: TransportCategory[] = await getTransportCategories();
	const locations = await getLocations();
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
			rl.question("\n\tNome: ", (input) => {
				resolve(input);
			});
		});

		const created = await insertTransportCategory(answer);
		console.log(`\n\tCategoria criada:\n\t\tId: ${created[0].id}\n\t\tNome: ${created[0].name}`);
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
			rl.question("\n\tNome: ", (input) => {
				resolve(input);
			});
		});
		staffPosition.name = nameAnswer;
	  
		descriptionAnswer = await new Promise<string>((resolve) => {
			rl.question("\n\tDescrição: ", (input) => {
				resolve(input);
			});
		});
		staffPosition.description = descriptionAnswer;
	  
		salaryAnswer = await new Promise<string>((resolve) => {
			rl.question("\n\tSalário: ", (input) => {
				resolve(input);
			});
		});
		staffPosition.salary = parseFloat(salaryAnswer);
	  
		const createdPosition = await insertStaffPosition(staffPosition);
		console.log(
		  	`\n\tCargo criado:\n\t\tId: ${createdPosition[0].id}\n\t\tNome: ${createdPosition[0].name}`
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
			rl.question("\n\tEndereço: ", (input) => {
				resolve(input);
			});
		});
		location.address = addressAnswer;

		// Fetch available category_ids from the database

		console.log("\nCategorias:");
		categories.forEach((category, index) => {
		  	console.log(`\t[${index + 1}] ID: ${category.id}\tName: ${category.name}`);
		});

		categoryIndexAnswer = await new Promise<string>((resolve) => {
			rl.question("Insira o índice da categoria para adicioná-la: ", (input) => {
				resolve(input);
			});
		});

		categoryIndex = parseInt(categoryIndexAnswer) - 1;
		if (isNaN(categoryIndex) || categoryIndex < 0 || categoryIndex >= categories.length) {
			console.log("Índice inválido!");
			break;
		}

		location.category_id = categories[categoryIndex].id;

		isStationAnswer = await new Promise<string>((resolve) => {
			rl.question("Is it a station? (true/false): ", (input) => {
				resolve(input);
			});
		});
		location.is_station = (isStationAnswer.toLowerCase() === "true");

		const createdLocation = await insertLocation(location);
		console.log(
		  	`\n\tParada criada:\n\t\tId: ${createdLocation[0].id}\n\t\tNome: ${createdLocation[0].address}`
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
			rl.question("Nome: ", (input) => {
				resolve(input);
			});
		});
		route.name = nameAnswer;

		// Fetch available location_ids from the database

		console.log("\nLocalizações:");
		locations.forEach((location, index) => {
		  	console.log(`\t[${index + 1}] Id: ${location.id}\tNome: ${location.address}`);
		});
		
		const startLocationIndexAnswer: string = await new Promise<string>((resolve) => {
			rl.question("Insira o índice da localização inicial: ", (input) => {
				resolve(input);
			});
		});
		
		const startLocationIndex = parseInt(startLocationIndexAnswer) - 1;
		if (isNaN(startLocationIndex) || startLocationIndex < 0 || startLocationIndex >= locations.length) {
			console.log("Índice inválido!");
			break;
		}
		
		route.location_start_id = locations[startLocationIndex].id;
	  
		const destinyLocationIndexAnswer: string = await new Promise<string>((resolve) => {
			rl.question("Insira o índice da localização final: ", (input) => {
				resolve(input);
			});
		});
		
		const destinyLocationIndex = parseInt(destinyLocationIndexAnswer) - 1;
		if (isNaN(destinyLocationIndex) || destinyLocationIndex < 0 || destinyLocationIndex >= locations.length) {
			console.log("Índice inválido!");
			break;
		}
		
		route.location_destiny_id = locations[destinyLocationIndex].id;
	  
		distanceAnswer = await new Promise<string>((resolve) => {
			rl.question("Distância: ", (input) => {
				resolve(input);
			});
		});
		route.distance = parseFloat(distanceAnswer);
	  
		const createdRoute = await insertRoute(route);
		console.log(
		  	`\n\tRoute created:\n\t\tID: ${createdRoute[0].id}\n\t\tName: ${createdRoute[0].name}`
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
		  rl.question("Enter the manufacturer of the vehicle: ", (input) => {
			resolve(input);
		  });
		});
		vehicle.manufacturer = manufacturerAnswer;
	  
		const modelAnswer: string = await new Promise<string>((resolve) => {
		  rl.question("Enter the model of the vehicle: ", (input) => {
			resolve(input);
		  });
		});
		vehicle.model = modelAnswer;
	  
		const yearAnswer: string = await new Promise<string>((resolve) => {
		  rl.question("Enter the year of the vehicle: ", (input) => {
			resolve(input);
		  });
		});
		vehicle.year = parseInt(yearAnswer);
	  
		const capacityAnswer: string = await new Promise<string>((resolve) => {
		  rl.question("Enter the capacity of the vehicle: ", (input) => {
			resolve(input);
		  });
		});
		vehicle.capacity = parseInt(capacityAnswer);
	  
		console.log("\nAvailable Category IDs:");
		categories.forEach((category, index) => {
		  console.log(`\t[${index + 1}] ID: ${category.id}\tName: ${category.name}`);
		});
	  
		categoryIndexAnswer = await new Promise<string>((resolve) => {
		  rl.question("Enter the index of the category ID for the vehicle: ", (input) => {
			resolve(input);
		  });
		});
	  
		categoryIndex = parseInt(categoryIndexAnswer) - 1;
		if (isNaN(categoryIndex) || categoryIndex < 0 || categoryIndex >= categories.length) {
		  console.log("Invalid category index!");
		  break;
		}
	  
		vehicle.category_id = categories[categoryIndex].id;
	  
		const createdVehicle = await insertVehicle(vehicle);
		console.log(
		  `\n\tVehicle created:\n\t\tID: ${createdVehicle[0].id}\n\t\tManufacturer: ${createdVehicle[0].manufacturer}\n\t\tModel: ${createdVehicle[0].model}`
		);
		break;
	  
    // Passenger
    // case 6:
	// 	await insertPassenger();
	// 	break;
    // // Ticket
    // case 7:
	// 	await insertTicket();
	// 	break;
    // // Payment
    // case 8:
	// 	await insertPayment();
	// 	break;
    // // Staff
    // case 9:
	// 	await insertStaff();
	// 	break;
    // // Feedback
    // case 10:
	// 	await insertFeedback();
	// 	break;
    // // Vehicle route
    // case 11:
	// 	await insertVehicleRoute();
	// 	break;
    // // Transportation
    // case 12:
	// 	await insertTransportation();
	// 	break;
    // // Staff vehicle
    // case 13:
	// 	await insertStaffVehicle();
	// 	break;
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
