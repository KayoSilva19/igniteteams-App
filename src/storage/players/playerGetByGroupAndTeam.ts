import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/appError';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { playersGetByGroup } from './playersGetByGroup';

export async function playerGetByGroupAndTeam(group: string, team: string){
  try {
    const storage = await playersGetByGroup(group);
    const players = storage.filter(player => player.team === team)
    return players
  } catch (error) {
    throw error
  }
}