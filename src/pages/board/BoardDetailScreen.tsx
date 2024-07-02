import { Text } from 'react-native'
import React, { useState } from 'react'
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteBoard } from '../../redux/actions/boardActions';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function BoardDetailScreen() {
    const dispatch: AppDispatch = useDispatch();

    const route = useRoute<RouteProp<RootStackParamList, "BoardDetail">>();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { user } = useSelector((state: RootState) => state.userReducer);

    const updateHandler = () => {
        navigation.navigate('BoardCreate', { ...route.params });
    }

    const deleteHandler = () => {
        dispatch(deleteBoard(route.params.board_id))
        navigation.navigate('Board');
    }
  
  return (
    <Container>
            <TopBox>
                <Title>{route.params.title}</Title>
                <WriterBox>
                  <Text>{route.params.user.username}</Text>
                </WriterBox>
                {user?.id !== null && user?.id == route.params.user_id &&
                <ButtonBox>
                  <UpdateButton onPress={updateHandler}>
                  <Text style={{color:'#FFFFFF'}}>수정</Text>
                  </UpdateButton>
                  <DeleteButton onPress={deleteHandler}>
                  <Text>삭제</Text>
                  </DeleteButton>
                </ButtonBox>
                }
            </TopBox>
            <BoundaryLine/>
            <MiddleBox>
                <Text>{route.params.content}</Text>
            </MiddleBox>
            <BoundaryLine/>
            <BottomBox>
                
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
    height: 60%;
    gap: 10px;
`;

const BottomBox = styled.View`
    padding: 30px;
    height: 15%;
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