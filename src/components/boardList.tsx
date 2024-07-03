import React, { useEffect, useState } from "react"
import { FlatList, View, Text, TouchableOpacity, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { fetchBoards, deleteBoard } from "../redux/actions/boardActions"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { AppDispatch, RootState } from "../redux/store"
import { Tables } from "../db/types/supabase"
import styled from "styled-components/native"
import OctiIcon from "react-native-vector-icons/Octicons"
import moment from "moment"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"

export default function BoardList() {
  const dispatch: AppDispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const isFocused = useIsFocused()

  const { data } = useSelector((state: RootState) => {
    return state.boardReducer
  })

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData()
    }
  }

  const getRefreshData = () => {
    setRefreshing(true)
    dispatch(fetchBoards())
    setRefreshing(false)
  }

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchBoards()).then(() => setIsLoading(false))
    }
  }, [dispatch, isFocused])

  const handlePress = (board: Tables<"board">) => {
    navigation.navigate("BoardDetail", { ...board })
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View>
      {data.length > 0 ? (
        <ChallengeScrollView
          data={data}
          keyExtractor={item => item.board_id}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.challenge_id} onPress={() => handlePress(item)}>
              <CardBox>
                <CardItem>
                  <CardTop>
                    <ProfileImage />
                    <Text>{item.user?.username}</Text>
                  </CardTop>
                  <ChallengeTitle>{item.title}</ChallengeTitle>
                  <CardBottom>
                    <Text>작성일 : {moment(item.created_at).format("YYYY.MM.DD")}</Text>
                    <LikeBox>
                      <TouchableOpacity>
                        <OctiIcon name={item.like_id ? "heart-fill" : "heart"} size={16} />
                      </TouchableOpacity>
                      <LikeCount> {item.like_count} </LikeCount>
                    </LikeBox>
                  </CardBottom>
                </CardItem>
              </CardBox>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          <Text>데이터가 없습니다.</Text>
        </View>
      )}
    </View>
  )
}

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

const LikeCount = styled.Text``
