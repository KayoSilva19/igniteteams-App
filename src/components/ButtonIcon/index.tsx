import { TouchableOpacityProps } from 'react-native';
import { ButtonIconTypeStyleProps, Icon } from './style';
import { Container } from './style';
import { Ionicons } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  type?: ButtonIconTypeStyleProps,
  icon: keyof typeof Ionicons.glyphMap,
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }:Props) {
  return (
    <Container {...rest}>
      <Icon 
        name={icon} 
        type={type}
      />
    </Container>
  )  
}