import { getRoutes, getLongestRoutes, getShortestRoutes, getLocations, getStations, getPassengers, getPassengersWithFeedback, getStaff, getVehicles } from "./dbQueries";
import { closeConnection } from "./dbConnection";
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
