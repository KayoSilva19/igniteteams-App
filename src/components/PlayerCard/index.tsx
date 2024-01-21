import { ButtonIcon } from '@components/ButtonIcon'
import { Container, Name, Icon } from './styles'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  name: string,
  onRemove: () => void
  // icon: keyof typeof Ionicons.glyphMap,
}

export function PlayerCard({ name, onRemove }:Props) {
  return (
    <Container>
      <Icon name='person-outline'/>
      <Name>{name}</Name>
      <ButtonIcon 
        icon='close-outline' 
        type='SECONDARY'
        onPress={onRemove}
      />
    </Container>
  )
}