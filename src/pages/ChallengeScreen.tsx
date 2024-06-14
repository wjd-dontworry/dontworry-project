import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import { fetchChallenge } from '../db/api/challenge';
import { Tables } from '../db/types/supabase';

export default function ChallengeScreen() {
  const [challenge, setChallenge] = useState<any>([]);

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

  useEffect(() => {
    const getChallenges = async () => {
      const challengeData = await fetchChallenge();
      //console.log(challengeData);
      setChallenge(challengeData);
    };

    getChallenges()
  }, []);

  return (
    <Container>
      <Text>최신순  |  공감순</Text>
      <ScrollView>
      {challenge.length > 0 ? (
        challenge.map((item : any) => (
        <TouchableOpacity key={item.challenge_id} onPress={() => navigation.navigate('ChallengeCreate' as never)}>
          <CardBox>
            <CardItem>
              <CardTop>
                <ProfileImage/>
                <Text>{item.user.username}</Text>
              </CardTop>
              <ChallengeTitle>{item.title}</ChallengeTitle>
              <CardBottom>
                <Text>작성일 : {item.start_date}</Text>
                <Text>0</Text>
              </CardBottom>
            </CardItem>
          </CardBox>
        </TouchableOpacity>
        ))
        ) : (
          <Text>데이터가 없습니다.</Text>
        )}
      </ScrollView>
        <CreateButton onPress={addButtonHandler}>
          <Text style={{textAlign:'center'}}>+</Text>
        </CreateButton>
    </Container>
  )
}

// ------------------- style ------------------- //
const Container = styled.View`
  padding: 20px;
`

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
  position: absolute;
  right: 20px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  background-color: #FFBE98;
  border-radius: 25px;
  justify-content: center;
  elevation: 3;
`;
