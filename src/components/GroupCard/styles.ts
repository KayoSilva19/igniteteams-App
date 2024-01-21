import { TouchableOpacity } from 'react-native'
import IonIcon from '@expo/vector-icons/Ionicons'
import styled from 'styled-components/native'

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
  padding: 24px;
  margin-bottom: 12px;
`
export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`
export const UsersIcon = styled(IonIcon).attrs(({ theme }) => ({
  name: 'people',
  size: 32,
  color: theme.COLORS.GREEN_700,
}))`
  margin-right: 20px;
`