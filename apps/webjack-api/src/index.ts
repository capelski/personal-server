import modena from 'modena';
import { join } from 'path';
import { existsSync } from 'fs';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { GameParameters, Card } from 'webjack-core';
import { exposeWebApi } from 'webjack-web-api';

interface Dictionary<T> {
	[key: string]: T;
}

const corsMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};

module.exports = modena.configureEndpoints((router: any, config: any, middleware: Dictionary<RequestHandler>) => {
	const appMiddleware = [ middleware.session, corsMiddleware ];
	let gameParameters: GameParameters | undefined = undefined;
	let developmentCardsSet: Card[] | undefined = undefined;

	const gameParametersFile = join(__dirname, '..', 'game-parameters.json');
	if (existsSync(gameParametersFile)) {
		gameParameters = require(gameParametersFile);
	}

	if (config.ENABLE_DEVELOPMENT_MODE && config.developmentCardsSet) {
		developmentCardsSet = config.developmentCardsSet;
	}
		
	exposeWebApi(router, appMiddleware, gameParameters, developmentCardsSet);
});
