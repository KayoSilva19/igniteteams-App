import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import IonIcon from '@expo/vector-icons/Ionicons'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`
export const UsersIcon = styled(IonIcon).attrs(({ theme }) => ({
  name: 'people-outline',
  size: 56,
  color: theme.COLORS.GREEN_700,
}))`
  align-self: center;
`
