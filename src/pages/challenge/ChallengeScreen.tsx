import { Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { createChallengeLike, deleteChallengeLike, fetchChallenge } from '../../db/api/challenge';
import {RootStackParamList} from '../../../types/navigation';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import moment from 'moment';
import 'moment/locale/ko';
import OctiIcon from 'react-native-vector-icons/Octicons';
import { supabase } from '../../db/supabase';

export default function ChallengeScreen() {
  const [challenge, setChallenge] = useState<any>([]);
  const [userUUID, setUserUUID] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({});
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({});
  const isFocused = useIsFocused();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const addButtonHandler = () => {
    navigation.navigate("ChallengeCreate" as never)
  }

  const getChallenges = async (orderBy: string, ascending: boolean) => {
    const challengeData = await fetchChallenge(orderBy, ascending);

    const newIsLiked: { [key: number]: boolean } = {};
    const newLikeCount: { [key: number]: number } = {};
    challengeData.forEach((challenge) => {

      newIsLiked[challenge.challenge_id] = challenge.challenge_like.some(like => like.user_id === userUUID);
      newLikeCount[challenge.challenge_id] = challenge.challenge_like.length;
  });
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    setChallenge(challengeData);
  }

  const getUserUUID = async (): Promise<string | null> => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return user?.id || null;
  };

  const fetchUserUUID = async () => {
    const uuid = await getUserUUID();
    setUserUUID(uuid);
  };

const likeButtonHandler = async (challenge: any) => {
  const challengeId = challenge.challenge_id as number;
  if (isLiked[challengeId]) {
    await deleteChallengeLike(userUUID as string, challengeId);
    setIsLiked((prevState) => ({
      ...prevState,
      [challengeId]: false,
    }));
    setLikeCount((prevState) => ({
      ...prevState,
      [challengeId]: prevState[challengeId] - 1,
    }));
  } else {
    await createChallengeLike(userUUID as string, challengeId);
    setIsLiked((prevState) => ({
      ...prevState,
      [challengeId]: true,
    }));
    setLikeCount((prevState) => ({
      ...prevState,
      [challengeId]: prevState[challengeId] + 1,
    }));
  }
};

const handlePress = (item: any) => {
  navigation.navigate('ChallengeDetail',{challengeId: item.challenge_id as number, title: item.title as string});
};

  useEffect(() => {
    if (isFocused) {
    fetchUserUUID();
    getChallenges('created_at', false);
    }
  }, [isFocused]);

  return (
    <Container>
      <SortBox>
      <TouchableOpacity onPress={() => getChallenges('created_at', false)}>
        <Text>최신순</Text>
      </TouchableOpacity>
      <Text>  |  </Text>
      <TouchableOpacity onPress={() => getChallenges('likes_count', false)}>
        <Text>공감순</Text>
      </TouchableOpacity>
      </SortBox>
      <ChallengeScrollView>
      {challenge.length > 0 ? (
        challenge.map((item : any) => (
        <TouchableOpacity key={item.challenge_id} onPress={() => handlePress(item) }>
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
                <TouchableOpacity onPress={() => likeButtonHandler(item)}>
                  <OctiIcon name={
                        isLiked[item.challenge_id as number]
                          ? 'heart-fill'
                          : 'heart'
                      } size={16} />
                </TouchableOpacity>
                  <LikeCount> {likeCount[item.challenge_id as number]} </LikeCount>
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
