import { getLongestRoutes } from "./dbQueries";
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
	const answer = await new Promise<string>((resolve) => {
		rl.question(
			"\tVoltar? Digite 0.\n\tBuscar rota mais longa? Digite 1.\n\tBuscar estações? Digite 2.\n\tBuscar passageiros que deram feedback? Digite 3\n\tBuscar nome, cargo e descrição do cargo dos funcionários? Digite 4\n\tBuscar veículos com maior capacidade? Digite 5.\n\tBuscar rotas com nome do veículo e do motorista? Digite 6.\n\t", (input) => {
				resolve(input);
			}
		);
	});

	option = parseInt(answer);
	switch(option) {
	case 0:
		return;
	case 1:
		try {
			const longestRoutes = await getLongestRoutes();
			console.log(longestRoutes);
		} catch (error) {
			console.error(error);
		}
		break;
	case 2:

		break;
	case 3:

		break;
	case 4:

		break;
	case 5:

		break;
	case 6:

		break;
	case 7:

		break;
	case 8:

		break;
	case 9:

		break;
	case 10:

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
}
  

main();
