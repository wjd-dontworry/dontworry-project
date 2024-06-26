import { Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../db/supabase';
import { useNavigation } from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { createChallengeRecord, deleteChallenge ,deleteChallengeLike, fetchChallengeByChallengeId, fetchParticipationIdByUserIdAndChallengeId } from '../../db/api/challenge';
import { Tables } from '../../db/types/supabase';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import moment, { now } from 'moment';

export default function BoardCreateScreen() {
    const [challengeTask, setChallengeTask] = useState<any>([]);
    const [challengeUser, setChallengeUser] = useState<any>([]);

    const [participationData, setParticipationData] = useState<any>();

    const route = useRoute<RouteProp<RootStackParamList, "ChallengeDetail">>();

    const navigation = useNavigation();

    const { user } = useSelector((state: RootState) => state.userReducer);

    const createParticipation = async () => {
        try {
            const { data, error } = await supabase
            .from('challenge_participation')
            .insert([
              {start_date: '2024-05-01', end_date: '2024-05-31' ,user_id: user?.id, challenge_id: route.params!.challengeId },
            ])
    
          if (error) {
            console.log('Error :', error);
            return [];
          }
    
        } catch (error) {
          console.log('Catch Error :', error);
          return [];
        }
      };
      
      const submit = async () => {
        if(participationData?.participation_id == null){
          await createParticipation();
          alert('도전을 시작합니다.');
          navigation.navigate('Home' as never)
        }else{
          await createChallengeRecord(moment().format('YYYY-MM-DD'),true,participationData?.participation_id);
          alert('성공으로 기록 완료');
        }
    }

    const fetchData = async () => {
      // 챌린지 가져오기
      const challengeData = await fetchChallengeByChallengeId(route.params!.challengeId);
      setChallengeTask(challengeData?.challenge_task);
      
      // 유저 가져오기
      setChallengeUser(challengeData?.user);

      // 챌린지 참여 가져오기
      const participationData = await fetchParticipationIdByUserIdAndChallengeId(user?.id as string, route.params!.challengeId);
      setParticipationData(participationData);
    };

    const deleteChallengeHandler = () => {
      deleteChallenge(route.params?.challengeId, user?.id as string);
      alert('삭제되었습니다.');
      navigation.goBack();
    }

    const updateChallengeHandler = () => {
      deleteChallenge(route.params?.challengeId, user?.id as string);
      navigation.navigate("ChallengeCreate" as never)
    }

    useEffect(() => {

        if(route.params?.challengeId){
          fetchData();
        }

      }, []);

  return (
    <Container>
            <TopBox>
                <Title>{route.params.title}</Title>
                <WriterBox>
                  <Text>{challengeUser.username}</Text>
                </WriterBox>
                {user?.id !== null && user?.id == challengeUser.user_id &&
                <ButtonBox>
                  <UpdateButton onPress={updateChallengeHandler}>
                  <Text style={{color:'#FFFFFF'}}>수정</Text>
                  </UpdateButton>
                  <DeleteButton onPress={deleteChallengeHandler}>
                  <Text>삭제</Text>
                  </DeleteButton>
                </ButtonBox>
                }
            </TopBox>
            <BoundaryLine/>
            <MiddleBox>
                <TimeTableHeader>
                    <Text>시간</Text>
                    <Text>챌린지</Text>
                </TimeTableHeader>
                <ScrollView>
                {challengeTask.map((item : Tables<'challenge_task'>, index : number) => (
                    <TimeTableBody key={index}>
                        <TimeText>{item.time}</TimeText>
                        <ChallengeText>{item.taskname}</ChallengeText>
                    </TimeTableBody>
                ))}
                </ScrollView>
            </MiddleBox>
            <BottomBox>
                {participationData?.participation_id == null ?
                <SubmitButton onPress={submit}>
                    <Text style={{color:'#FFFFFF'}}>도전</Text>
                </SubmitButton>
                : 
                <SubmitButton onPress={submit}>
                    <Text style={{color:'#FFFFFF'}}>오늘 하루 성공으로 기록하기</Text>
                </SubmitButton>
                }
            </BottomBox>
        </Container>
  )
}

// ------------------- style ------------------- //
const Container = styled.View`
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;

    gap: 20px;
`;

const TopBox = styled.View`
    padding: 30px;
    height: 15%;
`;

const MiddleBox = styled.View`
    padding: 30px;
    height: 65%;
    gap: 10px;
`;

const BottomBox = styled.View`
    padding: 30px;
    height: 10%;
    justify-content: center;
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin: -20px 0 0 0;
`;

const Title = styled.Text`
    font-size: 22px;
`;

const TimeTableHeader = styled.View`
    display: flex;
    flex-direction: row;
    gap: 55px;
`;

const TimeTableBody = styled.View`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 5px;
`;

const TimeText = styled.Text`
    width: 20%;
    font-size: 16px;
    padding: 5px 10px;

    border: 0.5px gray;
    background-color:#FFF6F1;
    border-radius: 5px;
`;

const ChallengeText = styled.Text`
    width: 75%;
    font-size: 16px;
    padding: 5px 10px;

    border: 0.5px gray;
    border-radius: 5px;
`;

const SubmitButton = styled.TouchableOpacity`
    padding: 5px 25px;
    background-color: #FFBE98;
    border-radius: 25px;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

const UpdateButton = styled.TouchableOpacity`
    padding: 5px 30px;
    background-color: #FFBE98;
    border-radius: 15px;
    height: 35px;
`;

const DeleteButton = styled.TouchableOpacity`
    padding: 5px 30px;
    background-color: #FFFFFF;
    border-radius: 15px;
    height: 35px;
    border: #FFBE98;
`;

const WriterBox = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const ButtonBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
`

const BoundaryLine = styled.View`
  height: 10px;
  background-color: #F1F1F1;
`