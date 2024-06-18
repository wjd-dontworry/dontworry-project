import { Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import { fetchChallenge } from '../../db/api/challenge';
import {RootStackParamList} from '../../../types/navigation';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import moment from 'moment';
import 'moment/locale/ko';
import OctiIcon from 'react-native-vector-icons/Octicons';

export default function ChallengeScreen() {
  const [challenge, setChallenge] = useState<any>([]);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const addButtonHandler = () => {
    navigation.navigate("ChallengeCreate" as never)
  }

  const getChallenges = async () => {
    const challengeData = await fetchChallenge()
    setChallenge(challengeData)
  }

  useEffect(() => {

    getChallenges()
  }, [])

  return (
    <Container>
      <SortBox>
      <TouchableOpacity onPress={() => getChallenges()}>
        <Text>최신순</Text>
      </TouchableOpacity>
      <Text> | </Text>
      <TouchableOpacity>
        <Text>공감순</Text>
      </TouchableOpacity>
      </SortBox>
      <ChallengeScrollView>
      {challenge.length > 0 ? (
        challenge.map((item : any) => (
        <TouchableOpacity key={item.challenge_id} onPress={() => navigation.navigate('ChallengeDetail',
        {challengeId: item.challenge_id as number, title: item.title as string})
        }>
          <CardBox>
            <CardItem>
              <CardTop>
                <ProfileImage/>
                <Text>{item.user.username}</Text>
              </CardTop>
              <ChallengeTitle>{item.title}</ChallengeTitle>
              <CardBottom>
                <Text>작성일 : {moment(item.created_at).format('YYYY.MM.DD')}</Text>
                <LikeBox>
                <TouchableOpacity>
                  <OctiIcon name={item.challenge_like.length > 0 ? 'heart-fill' : 'heart'} size={16} />
                </TouchableOpacity>
                  <LikeCount> 0 </LikeCount>
                </LikeBox>
              </CardBottom>
            </CardItem>
          </CardBox>
        </TouchableOpacity>
        ))
        ) : (
          <Text>데이터가 없습니다.</Text>
        )}
      </ChallengeScrollView>
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
const ChallengeScrollView = styled.ScrollView`
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
