import  AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupsGetAll';
import { AppError } from '@utils/appError';


export async function groupRemoveByName(deletedGroup: string) {
  try {
    const storedGroups = await groupsGetAll()
    const filteredGroups = storedGroups.filter(group => group !== deletedGroup)

    const newGroup = JSON.stringify(filteredGroups)
    await AsyncStorage.setItem(GROUP_COLLECTION, newGroup)
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${deletedGroup}`)
  } catch (error) {
    throw error
  }
}