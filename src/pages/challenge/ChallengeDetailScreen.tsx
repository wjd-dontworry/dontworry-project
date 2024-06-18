import { Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../db/supabase';
import { useNavigation } from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { deleteChallenge ,deleteChallengeLike, fetchChallengeByChallengeId, fetchParticipationIdByUserIdAndChallengeId } from '../../db/api/challenge';
import { Tables } from '../../db/types/supabase';

export default function ChallengeCreateScreen() {
    const [userUUID, setUserUUID] = useState<string | null>(null);

    const [challengeTask, setChallengeTask] = useState<any>([]);

    const [participationId, setParticipationId] = useState<number>(0);

    const route = useRoute<RouteProp<RootStackParamList, "ChallengeDetail">>();

    const navigation = useNavigation();

    const createParticipation = async () => {
        try {
            const { data, error } = await supabase
            .from('challenge_participation')
            .insert([
              {start_date: '2024-05-01', end_date: '2024-05-31' ,user_id: userUUID, challenge_id: route.params!.challengeId },
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

      const getUserUUID = async (): Promise<string | null> => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error);
          return null;
        }
        return user?.id || null;
      };
      
      const submit = async () => {
        await createParticipation();
        alert('도전을 시작합니다.');
        navigation.navigate('Home' as never)
    }

    const fetchData = async () => {
      // uuid 가져오기
      const uuid = await getUserUUID();
      setUserUUID(uuid);

      // 챌린지 가져오기
      const challengeData = await fetchChallengeByChallengeId(route.params!.challengeId);
      setChallengeTask(challengeData);

      // 챌린지 참여 가져오기
      const participationId = await fetchParticipationIdByUserIdAndChallengeId(uuid as string, route.params!.challengeId);
      setParticipationId(participationId as number);
    };

    const deleteChallengeHandler = () => {
      deleteChallenge(route.params?.challengeId, userUUID as string);
      alert('삭제되었습니다.');
      navigation.goBack();
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
                  <Text>홍길동</Text>
                  <Text>작성일 : </Text>
                </WriterBox>
                {userUUID !== null &&
                <ButtonBox>
                  <UpdateButton>
                  <Text style={{color:'#FFFFFF'}}>수정</Text>
                  </UpdateButton>
                  <DeleteButton onPress={deleteChallengeHandler}>
                  <Text>삭제</Text>
                  </DeleteButton>
                </ButtonBox>
                }
            </TopBox>
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
                {participationId == 0 &&
                <SubmitButton onPress={submit}>
                    <Text style={{color:'#FFFFFF'}}>도전</Text>
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
    padding: 30px;

    gap: 20px;
`;

const TopBox = styled.View`
    height: 15%;
`;

const MiddleBox = styled.View`
    height: 75%;
    gap: 10px;
`;

const BottomBox = styled.View`
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