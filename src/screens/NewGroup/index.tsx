import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@components/Header';
import { Container, Content, UsersIcon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()
  function handleNewPlayers() {
    navigation.navigate('players', { group })
  }
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <UsersIcon />
        <Highlight 
          title='Nova Turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input 
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />
        <Button 
          title='Criar'
          style={{ marginTop: 20}}
          onPress={handleNewPlayers}
        />
      </Content>
    </Container>
  )
}