import { Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { createChallengeLike, deleteChallengeLike } from '../../db/api/challenge';
import {RootStackParamList} from '../../types/navigation';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import moment from 'moment';
import 'moment/locale/ko';
import OctiIcon from 'react-native-vector-icons/Octicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchBoard } from '../../db/api/board';
import BoardList from '../../components/boardList';

export default function BoardScreen() {
  const isFocused = useIsFocused();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //const { user } = useSelector((state: RootState) => state.userReducer);

  const addButtonHandler = () => {
    navigation.navigate("BoardCreate" as never)
  }

  return (
    <Container>
      <SortBox>
      <TouchableOpacity>
        <Text>최신순</Text>
      </TouchableOpacity>
      <Text>  |  </Text>
      <TouchableOpacity>
        <Text>공감순</Text>
      </TouchableOpacity>
      </SortBox>
      <BoardList/>
      <CreateButton onPress={addButtonHandler}>
        <OctiIcon name='plus' size={32}/>
      </CreateButton>
    </Container>
  )
}

// ------------------- style ------------------- //
const Container = styled.View`
  padding: 20px;
`

const SortBox = styled.View`
  display: flex;
  flex-direction: row;
`
const ChallengeScrollView = styled.FlatList`
  min-height: 100%;
`

const CardBox = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  margin-top: 10px;
  elevation: 1;
  overflow: hidden;
`

const CardItem = styled.View`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const CardTop = styled.View``

const ProfileImage = styled.Image`
  src: "";
`

const ChallengeTitle = styled.Text``

const CardBottom = styled.View`
  display: flex;
  flex-direction: row;
`

const LikeBox = styled.View`
  padding-left: 10px;
  display: flex;
  flex-direction: row;
`

const LikeCount = styled.Text`
  
`

const CreateButton = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
  bottom: 50px;
  width: 60px;
  height: 60px;
  background-color: #ffbe98;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  elevation: 3;
`
