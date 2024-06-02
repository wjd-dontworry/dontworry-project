import { View, Text, Button } from 'react-native'
import React from 'react'
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';

export default function ChallengeScreen() {

  const navigation = useNavigation();

  const addButtonHandler = () => {

    navigation.navigate('ChallengeCreate' as never)
  }
        
  const CARDITEM = [
    {
      index: 1,
      title: '홍길동 자바 마스터 챌린지',
      writer: '홍길동',
      likeCount: 0,
      writeDateTime: '2024.05.10',
    },
    {
      index: 1,
      title: '홍길동 자바 마스터 챌린지',
      writer: '홍길동',
      likeCount: 0,
      writeDateTime: '2024.05.10',
    },
    {
      index: 1,
      title: '홍길동 자바 마스터 챌린지',
      writer: '홍길동',
      likeCount: 0,
      writeDateTime: '2024.05.10',
    },
  ]

  return (
    <View>
      <ListContainer>
      <Text>최신순  |  공감순</Text>
        <CardBox>
          <CardItem>
            <CardTop>
              <ProfileImage/>
              <Text>홍길동</Text>
            </CardTop>
            <ChallengeTitle>홍길동 자바 마스터 챌린지</ChallengeTitle>
            <CardBottom>
              <Text>작성일 : 2024.05.01</Text>
              <Text>0</Text>
            </CardBottom>
          </CardItem>
        </CardBox>
      </ListContainer>
      <CreateButton onPress={addButtonHandler}>
        <Text style={{textAlign:'center'}}>추가</Text>
      </CreateButton>
    </View>
  )
}

// ------------------- style ------------------- //
const ListContainer = styled.View`
  padding: 20px;
`;

const CardBox = styled.View`
  background-color: #FFFFFF;
  border-radius: 20px;
  margin-top: 10px;
  elevation: 1;
  overflow: hidden;
`;

const CardItem = styled.View`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CardTop = styled.View`
  
`;

const ProfileImage = styled.Image`
  src: '';
`;

const ChallengeTitle = styled.Text`
  
`;

const CardBottom = styled.View`
  display: flex;
  flex-direction: row;
`;

const CreateButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #FFBE98;
  border-radius: 25px;
  justify-content: center;
`;
