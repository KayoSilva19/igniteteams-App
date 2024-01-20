import { useState } from "react"
import { FlatList } from "react-native"
import { Header } from "@components/Header"
import { Container } from "./style"
import { Highlight } from "@components/Highlight"
import { GroupCard } from "@components/GroupCard"
import { ListEmpty } from "@components/ListEmpty"

export function Groups() {
 const [groups, setGroups] = useState<string[]>([/*'Galera da Tray', 'Amigos', 'Carros', 'teste', 'a','b','c','d','e'*/])

  return (
    <Container>
      <Header />
      <Highlight 
        title="Turmas" 
        subtitle="Jogue com sua turma!"
      />

      <FlatList 
        data={groups}
        keyExtractor={(key) => key}
        renderItem={({item}) => (
          <GroupCard 
            title={item}
          />
        )}  

        showsVerticalScrollIndicator={false}
        
        ListEmptyComponent={<ListEmpty/>}
      />


    </Container>
  )
}