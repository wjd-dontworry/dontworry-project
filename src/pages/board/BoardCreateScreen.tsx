import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { createBoard, updateBoard } from '../../redux/actions/boardActions';
import { useDispatch } from 'react-redux';

export default function BoardCreateScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route = useRoute<RouteProp<RootStackParamList, "BoardCreate">>();

  const submit = async () => {
    if(route.params){
        const boardId = route.params.board_id;
        console.log(boardId);
        dispatch(updateBoard(boardId, title, content));
    }else {
        if (title && content && user.id) {
          dispatch(createBoard(title, content, user.id));
        }
    }
    
    navigation.navigate('Board');
  };

  useEffect(() => {
      if(route.params){
        setTitle(route.params.title!)
        setContent(route.params.content!)
    }
  }, [])
  

  return (
      <Container>
          <SafeAreaView>
              <TopBox>
                  <TitleInput
                      placeholder="제목을 입력하세요"
                      value={title}
                      onChangeText={setTitle}
                  />
                  <BottomBorder />
              </TopBox>
              <MiddleBox>
                  <ContentInput
                      multiline={true}
                      textAlignVertical="top"
                      placeholder="내용을 입력하세요"
                      value={content}
                      onChangeText={setContent}
                  />
              </MiddleBox>
              <BottomBox>
                  <SubmitButton onPress={submit}>
                      <Text style={{ color: '#FFFFFF' }}>등록</Text>
                  </SubmitButton>
                  <CancelButton onPress={() => navigation.goBack()}>
                      <Text>취소</Text>
                  </CancelButton>
              </BottomBox>
          </SafeAreaView>
      </Container>
  );
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

const ContentInput = styled.TextInput`
    font-size: 18px;
    padding: 20px;
    min-height: 75%;

    border: 0.5px gray;
    border-radius: 10px;
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