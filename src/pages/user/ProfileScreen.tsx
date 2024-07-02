import styled from "styled-components/native"
import { useEffect, useState } from "react"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { supabase } from "../../db/supabase"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"

import { AppDispatch, RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/actions/userActions"
import Icon from "react-native-vector-icons/FontAwesome"
import DownIcon from "react-native-vector-icons/AntDesign"
import OctiIcon from "react-native-vector-icons/Octicons"
import * as Progress from "react-native-progress"

type RootStackParamList = {
  Home: undefined
  Login: undefined
  UserUpdate: undefined
}

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { user } = useSelector((state: RootState) => state.userReducer)
  const [isGoalOpen, setIsGoalOpen] = useState(false)
  const [isLikeOpen, setIsLikeOpen] = useState(false)
  const [likeCount, setLikeCount] = useState<number>(0)

  const dispatch: AppDispatch = useDispatch()

  // test유저가 올린 전체 글에 대한 전체 공감수 쿼리 수정 필요
  // 현재 email 불러오는데 auth에서 현재 불러오는데 userName, profile_image redux에서 불러올 수 있도록
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        if (user) {
          const { data, error } = await supabase.from("challenge").select("like_count", { count: "exact" }).eq("user_id", user.id)
          if (error) {
            console.error("Error fetching like count:", error.message)
            return
          }
          setLikeCount(data?.length ? data.length : 0)
        }
      } catch (error) {
        console.error("Error fetching like count:", error)
      }
    }

    fetchLikeCount()
  }, [user])

  const MemberOut = async () => {
    try {
      const {
        data: { user },
        error: getUserError,
      } = await supabase.auth.getUser()

      if (getUserError) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", getUserError)
        return
      }

      if (user) {
        const { error: deleteUserError } = await supabase.rpc("delete_user")
        if (deleteUserError) {
          console.error("회원 탈퇴 중에 문제가 생겼습니다:", deleteUserError.message)
        } else {
          alert("회원 탈퇴 되었습니다")
          navigation.navigate("Home")
        }
      } else {
        alert("사용자 정보를 가져올 수 없습니다.")
      }
    } catch (error) {
      console.error("회원 탈퇴 중 예기치 않은 오류 발생:", error)
      alert("회원 탈퇴 중에 문제가 생겼습니다.")
    }
  }

  const LogOut = async () => {
    dispatch(logout())
    navigation.navigate("Login")
  }

  const toggleGoalBox = () => setIsGoalOpen(prevState => !prevState)

  const toggleLikeBox = () => setIsLikeOpen(prevState => !prevState)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error || !session) {
        alert("세션이 만료되었습니다. 다시 로그인해 주세요.")
        navigation.navigate("Login")
      }
    }

    checkSession()
  }, [navigation])

  return (
    <ProfileTopBox>
      <ProfileBox>
        {/* {user?.user_metadata.profile_image ? <UserProfile name="user-circle" /> : <UserProfile name="user-circle" />} */}
        <UserProfile name="user-circle" />
        <UserInfoBox>
          <Text>
            <UserNameLabel>{user?.email || "홍길동"}</UserNameLabel> <UserHelloLabel>님 {"\n"}안녕하세요</UserHelloLabel>
            {/* <UserNameLabel>{user?.user_metadata.username || ""}</UserNameLabel> <UserHelloLabel>님 {"\n"}안녕하세요</UserHelloLabel> */}
          </Text>
          <ButtonBox>
            <Button onPress={() => navigation.navigate("UserUpdate")}>
              <Text>회원정보 수정</Text>
              <Icon name="chevron-right" size={16} />
            </Button>
            <Button onPress={() => MemberOut()}>
              <Text>회원탈퇴</Text>
              <Icon name="chevron-right" size={16} />
            </Button>
          </ButtonBox>
        </UserInfoBox>
      </ProfileBox>
      <UserDataBox>
        <SliderAreaBox>
          <DropBox>
            <SlideBox>
              <GoalPercentText>달성률 확인하기</GoalPercentText>
              <DownIcon name="caretdown" size={15} onPress={() => toggleGoalBox()} />
            </SlideBox>
            {isGoalOpen && (
              <ShowSlideBox>
                <ChallengeGoalOuterListBox>
                  <ChallengeGoalInnerListBox>
                    <ChallengeTextBox>
                      <ChallengeText>자바 공부하기</ChallengeText>
                    </ChallengeTextBox>
                    <ProgressBarBox>
                      <DataBox>
                        <GoalText>주간 달성률</GoalText>
                        <PercentText>50%</PercentText>
                        <ProgressBarData progress={0.5} color="#FFBE98" />
                      </DataBox>
                      <DataBox>
                        <GoalText>월간 달성률</GoalText>
                        <PercentText>30%</PercentText>
                        <ProgressBarData progress={0.3} color="#FFBE98" />
                      </DataBox>
                    </ProgressBarBox>
                  </ChallengeGoalInnerListBox>
                  <NextChallengeBox />
                  <ChallengeGoalInnerListBox>
                    <ChallengeTextBox>
                      <ChallengeText>자바 공부하기</ChallengeText>
                    </ChallengeTextBox>
                    <ProgressBarBox>
                      <DataBox>
                        <GoalText>주간 달성률</GoalText>
                        <PercentText>50%</PercentText>
                        <ProgressBarData progress={0.5} color="#FFBE98" />
                      </DataBox>
                      <DataBox>
                        <GoalText>월간 달성률</GoalText>
                        <PercentText>30%</PercentText>
                        <ProgressBarData progress={0.3} color="#FFBE98" />
                      </DataBox>
                    </ProgressBarBox>
                  </ChallengeGoalInnerListBox>
                  <NextChallengeBox />
                  <ChallengeGoalInnerListBox>
                    <ChallengeTextBox>
                      <ChallengeText>자바 공부하기</ChallengeText>
                    </ChallengeTextBox>
                    <ProgressBarBox>
                      <DataBox>
                        <GoalText>주간 달성률</GoalText>
                        <PercentText>50%</PercentText>
                        <ProgressBarData progress={0.5} color="#FFBE98" />
                      </DataBox>
                      <DataBox>
                        <GoalText>월간 달성률</GoalText>
                        <PercentText>30%</PercentText>
                        <ProgressBarData progress={0.3} color="#FFBE98" />
                      </DataBox>
                    </ProgressBarBox>
                  </ChallengeGoalInnerListBox>
                  <NextChallengeBox />
                  <ChallengeGoalInnerListBox>
                    <ChallengeTextBox>
                      <ChallengeText>자바 공부하기</ChallengeText>
                    </ChallengeTextBox>
                    <ProgressBarBox>
                      <DataBox>
                        <GoalText>주간 달성률</GoalText>
                        <PercentText>50%</PercentText>
                        <ProgressBarData progress={0.5} color="#FFBE98" />
                      </DataBox>
                      <DataBox>
                        <GoalText>월간 달성률</GoalText>
                        <PercentText>30%</PercentText>
                        <ProgressBarData progress={0.3} color="#FFBE98" />
                      </DataBox>
                    </ProgressBarBox>
                  </ChallengeGoalInnerListBox>
                  <NextChallengeBox />
                </ChallengeGoalOuterListBox>
              </ShowSlideBox>
            )}
          </DropBox>
        </SliderAreaBox>
        <SliderAreaBox>
          <DropBox>
            <SlideBox>
              <GoalPercentText>내가 받은 공감 게시글</GoalPercentText>
              <DownIcon name="caretdown" size={15} onPress={() => toggleLikeBox()} style={{ justifyContent: "center" }} />
            </SlideBox>
            {isLikeOpen && (
              <ShowSlideBox>
                <MyBoardOuterListBox>
                  <MyBoardInnerListBox>
                    <MyBoardTextBox>
                      <BoardText>자바 공부하기</BoardText>
                    </MyBoardTextBox>
                    <MyBoardLikeBox>
                      <OctiIcon name="heart-fill" size={15} />
                      <LikedChallengesList>{likeCount}</LikedChallengesList>
                    </MyBoardLikeBox>
                  </MyBoardInnerListBox>
                  <NextChallengeBox />
                  <MyBoardInnerListBox>
                    <MyBoardTextBox>
                      <BoardText>자바 공부하기</BoardText>
                    </MyBoardTextBox>
                    <MyBoardLikeBox>
                      <OctiIcon name="heart-fill" size={15} />
                      <LikedChallengesList>{likeCount}</LikedChallengesList>
                    </MyBoardLikeBox>
                  </MyBoardInnerListBox>
                  <NextChallengeBox />
                  <MyBoardInnerListBox>
                    <MyBoardTextBox>
                      <BoardText>자바 공부하기</BoardText>
                    </MyBoardTextBox>
                    <MyBoardLikeBox>
                      <OctiIcon name="heart-fill" size={15} />
                      <LikedChallengesList>{likeCount}</LikedChallengesList>
                    </MyBoardLikeBox>
                  </MyBoardInnerListBox>
                  <NextChallengeBox />
                  <MyBoardInnerListBox>
                    <MyBoardTextBox>
                      <BoardText>자바 공부하기</BoardText>
                    </MyBoardTextBox>
                    <MyBoardLikeBox>
                      <OctiIcon name="heart-fill" size={15} />
                      <LikedChallengesList>{likeCount}</LikedChallengesList>
                    </MyBoardLikeBox>
                  </MyBoardInnerListBox>
                  <NextChallengeBox />
                  <MyBoardInnerListBox>
                    <MyBoardTextBox>
                      <BoardText>자바 공부하기</BoardText>
                    </MyBoardTextBox>
                    <MyBoardLikeBox>
                      <OctiIcon name="heart-fill" size={15} />
                      <LikedChallengesList>{likeCount}</LikedChallengesList>
                    </MyBoardLikeBox>
                  </MyBoardInnerListBox>
                  <NextChallengeBox />
                  <MyBoardInnerListBox>
                    <MyBoardTextBox>
                      <BoardText>자바 공부하기</BoardText>
                    </MyBoardTextBox>
                    <MyBoardLikeBox>
                      <OctiIcon name="heart-fill" size={15} />
                      <LikedChallengesList>{likeCount}</LikedChallengesList>
                    </MyBoardLikeBox>
                  </MyBoardInnerListBox>
                  <NextChallengeBox />
                </MyBoardOuterListBox>
              </ShowSlideBox>
            )}
          </DropBox>
        </SliderAreaBox>
      </UserDataBox>
      <LogOutBox>
        <Button onPress={() => LogOut()}>
          <Text>로그아웃</Text>
          <Icon name="chevron-right" size={16} />
        </Button>
      </LogOutBox>
    </ProfileTopBox>
  )
}

// ------------------- style ------------------- //

const ProfileTopBox = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  align-items: center;
`

const ProfileBox = styled.View`
  width: 85%;
  height: 20%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const UserProfile = styled(Icon)`
  font-size: 50px;
`

const UserInfoBox = styled(View)`
  flex-direction: column;
  gap: 10px;
`

const ButtonBox = styled(View)`
  flex-direction: row;
  gap: 15px;
`

const UserNameLabel = styled(Text)`
  font-size: 16px;
  font-family: "LINE Seed Sans KR";
  font-weight: 700;
`

const UserHelloLabel = styled(Text)`
  font-size: 16px;
  font-family: "LINE Seed Sans KR";
`

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const UserDataBox = styled(View)`
  width: 100%;
  height: 70%;
  align-items: center;
  flex-direction: column;
  background-color: #f1f1f1;
`

const SliderAreaBox = styled(View)`
  width: 100%;
  height: 50%;
  gap: 20px;
  align-items: center;
  justify-content: center;
`

const DropBox = styled(View)`
  width: 90%;
  height: 90%;
`

const SlideBox = styled(View)`
  height: 20%;
  gap: 10px;
  flex-direction: row;
  align-items: center;
`

const GoalPercentText = styled(Text)`
  font-family: "LINE Seed Sans KR";
  font-size: 15px;
  font-weight: 600;
`

const ShowSlideBox = styled(View)`
  width: 90%;
  height: 90%;
  margin: 0px auto;
  background-color: #fff;
  justify-content: center;
  border-radius: 20px;
`

const ChallengeGoalOuterListBox = styled(ScrollView)`
  margin: 10px auto;
  width: 90%;
`

const ChallengeGoalInnerListBox = styled(View)`
  flex-direction: row;
  gap: 5px;
`

const ChallengeTextBox = styled(View)`
  width: 25%;
  justify-content: center;
  align-items: center;
`

const ChallengeText = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const ProgressBarBox = styled(View)`
  gap: 5px;
  width: 70%;
  flex-direction: column;
`

const DataBox = styled(View)`
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const GoalText = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const PercentText = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const ProgressBarData = styled(Progress.Bar)`
  width: 50%;
  height: 50%;
  background-color: #ffeee5;
`

const NextChallengeBox = styled(View)`
  width: 100%;
  border: 2px solid #ffebe0;
  border-radius: 20%;
  margin-top: 8px;
  margin-bottom: 8px;
`

const MyBoardOuterListBox = styled(ScrollView)`
  margin: 10px auto;
  width: 90%;
`

const MyBoardInnerListBox = styled(View)`
  flex-direction: row;
  gap: 5px;
`

const MyBoardTextBox = styled(View)`
  width: 25%;
  justify-content: center;
  align-items: center;
`

const BoardText = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const MyBoardLikeBox = styled(View)`
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
`

const LikedChallengesList = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const LogOutBox = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
`
