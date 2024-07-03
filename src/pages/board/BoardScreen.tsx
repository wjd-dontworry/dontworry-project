import { Text, TouchableOpacity } from "react-native"
import React from "react"
import styled from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../types/navigation"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types"
import "moment/locale/ko"
import OctiIcon from "react-native-vector-icons/Octicons"
import BoardList from "../../components/boardList"

export default function BoardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const addButtonHandler = () => {
    navigation.navigate("BoardCreate" as never)
  }

  return (
    <Container>
      <SortBox>
        <TouchableOpacity>
          <Text>최신순</Text>
        </TouchableOpacity>
        <Text> | </Text>
        <TouchableOpacity>
          <Text>공감순</Text>
        </TouchableOpacity>
      </SortBox>
      <BoardList />
      <CreateButton onPress={addButtonHandler}>
        <OctiIcon name="plus" size={32} />
      </CreateButton>
    </Container>
  )
}

// ------------------- style ------------------- //
const Container = styled.View`
  padding: 20px;
  min-height: 100%;
`

const SortBox = styled.View`
  flex-direction: row;
`

const CreateButton = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
  bottom: 20%;
  width: 60px;
  height: 60px;
  background-color: #ffbe98;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  elevation: 3;
`
