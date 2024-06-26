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
import { useDispatch, useSelector } from 'react-redux';
import { ChallengeWithUser, fetchChallenge } from '../../redux/actions/challengeActions';
import { RootState, AppDispatch } from '../../redux/store';

export default function BoardScreen() {
  const [challenge, setChallenge] = useState<ChallengeWithUser[]>([]);
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({});
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({});
  const isFocused = useIsFocused();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch: AppDispatch = useDispatch();
  const { data, error } = useSelector((state: RootState) => state.challengeReducer);
  const { user } = useSelector((state: RootState) => state.userReducer);

  const addButtonHandler = () => {
    navigation.navigate("BoardCreate" as never)
  }

  const getChallenges = async (orderBy: string, ascending: boolean) => {
    const challengeData = data;

    const newIsLiked: { [key: number]: boolean } = {};
    const newLikeCount: { [key: number]: number } = {};
    challengeData.forEach((challenge: ChallengeWithUser) => {

      newIsLiked[challenge.challenge_id] = challenge.challenge_like.some(like => like.user_id === user?.id);
      newLikeCount[challenge.challenge_id] = challenge.challenge_like.length;
  });
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    setChallenge(challengeData);
  }

const likeButtonHandler = async (challenge: any) => {
  const challengeId = challenge.challenge_id as number;
  if (isLiked[challengeId]) {
    await deleteChallengeLike(user?.id as string, challengeId);
    setIsLiked((prevState) => ({
      ...prevState,
      [challengeId]: false,
    }));
    setLikeCount((prevState) => ({
      ...prevState,
      [challengeId]: prevState[challengeId] - 1,
    }));
  } else {
    await createChallengeLike(user?.id as string, challengeId);
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
    if (isFocused && user) {
    dispatch(fetchChallenge('created_at', true)).then(() => getChallenges('created_at', false));
    
    }
  }, [isFocused, user]);

  return (
    <Container>
      <SortBox>
      <TouchableOpacity onPress={() => dispatch(fetchChallenge('created_at', false))}>
        <Text>최신순</Text>
      </TouchableOpacity>
      <Text>  |  </Text>
      <TouchableOpacity onPress={() => dispatch(fetchChallenge('likes_count', false))}>
        <Text>공감순</Text>
      </TouchableOpacity>
      </SortBox>
      {challenge.length > 0 ? (
      <ChallengeScrollView
        data={data}
        keyExtractor={(item : ChallengeWithUser) => item.challenge_id}
        renderItem={({ item } : { item : ChallengeWithUser}) => (
        <TouchableOpacity key={item.challenge_id} onPress={() => handlePress(item) }>
          <CardBox>
            <CardItem>
              <CardTop>
                <ProfileImage/>
                <Text>{item.user?.username}</Text>
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
        )}/>
        ) : (
          <Text>데이터가 없습니다.</Text>
        )}
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
