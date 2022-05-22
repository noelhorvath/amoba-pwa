import { GameStatus } from '../enums/GameEngine.enums';
import { RecordCoordinate } from '../models/classes/RecordCoordinate';

export type GameState = { status: GameStatus; winnerCords?: RecordCoordinate[] | undefined };
