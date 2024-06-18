import { Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../db/supabase';
import { useNavigation } from '@react-navigation/native';
import {RootStackParamList} from '../../../types/navigation';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export default function ChallengeCreateScreen() {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState<string | undefined>();
    const [userUUID, setUserUUID] = useState<string | null>(null);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [challengeList, setChallengeList] = useState([
        {id:0, time:'', taskname:''}
    ]);

    const onChangeItemInput = (id: number, name: string, value: string) => {
        setChallengeList(challengeList.map(item =>
            item.id === id ? { ...item, [name]: value } : item
        ));
    };

    const removeChallenge = (id: number) => {
        setChallengeList(challengeList.filter(item => item.id !== id));
    };

    const addChallenge = () => {
        const lastId = challengeList.length > 0 ? challengeList[challengeList.length - 1].id : 0;
        setChallengeList([
            ...challengeList,
            {
                id: lastId + 1,
                time: '',
                taskname: ''
            }
        ]);
    }

    const createChallenge = async () => {
        try {
            const { data, error } = await supabase
            .from('challenge')
            .insert([
              { title: title ,user_id: userUUID },
            ])
            .select('challenge_id')
    
          if (error) {
            console.log('Error :', error);
            return [];
          }
    
          return data;
        } catch (error) {
          console.log('Catch Error :', error);
          return [];
        }
      };

      const createTasks = async (challengeId: number, tasks: Array<{ time: string; taskname: string }>) => {
        try {
          const inserts = tasks.map(task => ({
            taskname: task.taskname,
            time: task.time,
            challenge_id: challengeId,
          }));
      
          const { data, error } = await supabase
            .from('challenge_task')
            .insert(inserts);
      
          if (error) {
            console.log('Error :', error);
            return [];
          }
      
          return data;
        } catch (error) {
          console.log('Catch Error :', error);
          return [];
        }
      };

      const getChallenges = async () => {
        const challengeData = await createChallenge();
        if(challengeData.length > 0) {
            console.log(challengeData[0].challenge_id);
            return challengeData[0].challenge_id;
        } else {
            console.error('No challenge data found');
            return null;
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

      useEffect(() => {
        const fetchUserUUID = async () => {
          const uuid = await getUserUUID();
          setUserUUID(uuid);
        };
    
        fetchUserUUID();
      }, []);

      const submit = async () => {
        const challengeId = await getChallenges();
        if (challengeId) {
            await createTasks(challengeId, challengeList);
            navigation.navigate('ChallengeDetail', {challengeId: challengeId as number, title: title as string})
        }
    }
    

  return (
    <Container>
          <SafeAreaView>
            <TopBox>
                <TitleInput placeholder='제목을 입력하세요' value={title} onChangeText={setTitle}/>
                <BottomBorder/>
            </TopBox>
            <MiddleBox>
                <TimeTableHeader>
                    <Text>시간</Text>
                    <Text>챌린지</Text>
                </TimeTableHeader>
                <ScrollView>
                {challengeList.map((item, index) => (
                    <TimeTableBody key={item.id}>
                        <TimeInput
                            value={item.time}
                            onChangeText={(value:string) => onChangeItemInput(item.id, 'time', value)}
                        />
                        <ChallengeInput
                            value={item.taskname}
                            onChangeText={(value:string) => onChangeItemInput(item.id, 'taskname', value)}
                        />
                        <TouchableOpacity onPress={() => removeChallenge(item.id)}>
                          <DeleteButton>
                            <Text>-</Text>
                          </DeleteButton>
                        </TouchableOpacity>
                    </TimeTableBody>
                ))}
                <TouchableOpacity onPress={addChallenge} style={{alignItems:'center'}}>
                  <AddButton>
                    <Text>+</Text>
                  </AddButton>
                </TouchableOpacity>
                </ScrollView>
            </MiddleBox>
            <BottomBox>
                <SubmitButton onPress={submit}>
                    <Text style={{color:'#FFFFFF'}}>등록</Text>
                </SubmitButton>
                <CancelButton onPress={() => navigation.goBack()}>
                    <Text>취소</Text>
                </CancelButton>
            </BottomBox>
    </SafeAreaView>
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
    height: 10%;
`;

const MiddleBox = styled.View`
    height: 80%;
    gap: 10px;
`;

const BottomBox = styled.View`
    height: 10%;
    justify-content: center;
    display: flex;
    flex-direction: row;
    gap: 30px;
`;

const TitleInput = styled.TextInput`
    font-size: 22px;
`;

const BottomBorder = styled.View`
  border: 0.5px gray;
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

const TimeInput = styled.TextInput`
    width: 20%;
    font-size: 16px;
    padding: 5px 10px;

    border: 0.5px gray;
    background-color:#FFF6F1;
    border-radius: 5px;
`;

const ChallengeInput = styled.TextInput`
    width: 65%;
    font-size: 16px;
    padding: 5px 10px;

    border: 0.5px gray;
    border-radius: 5px;
`;

const DeleteButton = styled.View`
    background-color: #FFE6BF;
    width: 30px;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const AddButton = styled.View`
    background-color: #FFE6BF;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;

const SubmitButton = styled.TouchableOpacity`
    padding: 5px 30px;
    background-color: #FFBE98;
    border-radius: 15px;
    height: 35px;
`;

const CancelButton = styled.TouchableOpacity`
    padding: 5px 30px;
    background-color: #FFFFFF;
    border-radius: 15px;
    height: 35px;
    border: 1px #FFBE98;
`;