import { useState, useEffect, useRef } from 'react';
import { Header } from '@components/Header';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { playersAddByGroup } from '@storage/players/playersAddByGroup';
import { playerGetByGroupAndTeam } from '@storage/players/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Alert, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { AppError } from '@utils/appError';
import { Loading } from '@components/Loading';

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState('Time A')
  const [newPlayer, setNewPlayer] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const newPlayerInputRef = useRef<TextInput>(null)
  
  const navigation =  useNavigation()

  const route = useRoute()
  const { group } = route.params as RouteParams


  async function handleAddPlayer() {
    if (newPlayer.trim().length === 0) {
      return Alert.alert('Novo jogador', 'Informe o nome do novo jogador.')
    }

    const addNewPlayer = {
      name: newPlayer.trim(),
      team,
    }

    try {
      await playersAddByGroup(addNewPlayer, group)
      newPlayerInputRef.current?.blur()

      fetchPlayersByTeam()
      setNewPlayer('')


    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo jogador', error.message)
      }
    
      Alert.alert('Novo jogador', 'Não foi possível adicionar o novo jogador.')
      console.log(error)
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playerByTeam = await playerGetByGroupAndTeam(group, team)

      setPlayers(playerByTeam)
    } catch (error) {
      Alert.alert('Não foi possível carregar os jogadores do time selecionado')
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert('Remover Jogador', 'Não foi possível remover o jogador')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
      
    } catch (error) {
      Alert.alert('Remover Grupo', 'Não foi possível remover a turma')
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja Remover a turma?',
      [
        { text: 'Não', style: 'cancel'},
        { text: 'Sim', onPress: () => groupRemove()},
      ]
    )
  }
 
  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])
  return (
    <Container>
      <Header showBackButton/>
      <Highlight 
        title={group}
        subtitle='adicione a galera e separe os times'
      />

    <Form>
      <Input 
        inputRef={newPlayerInputRef}
        placeholder='Nome da pessoa' 
        value={newPlayer}
        onChangeText={setNewPlayer}
        autoCorrect={false}

        onSubmitEditing={handleAddPlayer}
        returnKeyType='done'
      />
      <ButtonIcon 
        icon='add' 
        type='PRIMARY'
        onPress={handleAddPlayer}
      />
    </Form>
    <HeaderList>
      <FlatList
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Filter 
            title={item}
            isActive={item === team}
            onPress={() => setTeam(item)}
          />
        )}
        horizontal
      />

      <NumberOfPlayers>{players.length}</NumberOfPlayers>
    </HeaderList>

    { 
    
      isLoading ? <Loading/> :
      
      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard 
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}

        showsVerticalScrollIndicator={false}

        ListEmptyComponent={
          <ListEmpty message='Não há pessoas neste time!' />
        }

        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1},
        ]}

      />

    }

    <Button 
      title='Remover turma' 
      type='SECONDARY'
      onPress={handleGroupRemove}
    />
    </Container>
  )
}