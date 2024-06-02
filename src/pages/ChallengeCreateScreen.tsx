import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import { supabase } from '../db/supabase';
import { Tables } from '../db/types/supabase';

export default function ChallengeCreateScreen() {
    const [title, setTitle] = useState('');

    const [challengeList, setChallengeList] = useState([
        {id:0, time:'', challenge:''}
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
                challenge: ''
            }
        ]);
    }

    const createChallenge = async () => {
        try {
            const { data, error } = await supabase
            .from('challenge')
            .insert([
              { title: title, start_date: '2024-05-01', end_date: '2024-05-31' ,user_id: '058e481b-02a5-4094-98c1-2a6084d08442' },
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

      const createTask = async () => {
        try {
            const { data, error } = await supabase
            .from('challenge_task')
            .insert([
              { taskname: 'test', time: '18:51:01' ,challenge_id: 1 },
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

      const getChallenges = async () => {
        const challengeData = await createChallenge();
        console.log(challengeData[0].challenge_id);

        return challengeData[0].challenge_id;
      };

    const submit = () => {
        console.log(getChallenges());
        //createTask();
        console.log(title);
        console.log(challengeList);
    }

  return (
    <SafeAreaView>
        <Container>
            <TopBox>
                <TitleInput placeholder='제목을 입력하세요' value={title} onChangeText={setTitle}/>
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
                            value={item.challenge}
                            onChangeText={(value:string) => onChangeItemInput(item.id, 'challenge', value)}
                        />
                        <Button title='삭제' onPress={() => removeChallenge(item.id)}/>
                    </TimeTableBody>
                ))}
                <AddButton title='추가' onPress={addChallenge}/>
                </ScrollView>
            </MiddleBox>
            <BottomBox>
                <SubmitButton onPress={submit}>
                    <Text style={{color:'#FFFFFF'}}>등록</Text>
                </SubmitButton>
                <CancelButton>
                    <Text>취소</Text>
                </CancelButton>
            </BottomBox>
        </Container>
    </SafeAreaView>
  )
}

// ------------------- style ------------------- //
const Container = styled.View`
    background-color: '#FFFFFF';
    width: 100%;
    height: 100%;
    padding: 20px;

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

const TimeTableHeader = styled.View`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const TimeTableBody = styled.View`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 10px;
`;

const TimeInput = styled.TextInput`
    width: 20%;
    font-size: 16px;
    padding: 5px 10px;

    border: 1px gray;
    border-radius: 5px;
`;

const ChallengeInput = styled.TextInput`
    width: 60%;
    font-size: 16px;
    padding: 5px 10px;

    border: 1px gray;
    border-radius: 5px;
`;

const AddButton = styled.Button`
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