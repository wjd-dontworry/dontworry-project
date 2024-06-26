import { useEffect, useState } from "react"
import styled from "styled-components/native"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { supabase } from "../db/supabase"
import { View, Text, TouchableOpacity } from "react-native"

import { AppDispatch, RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../redux/actions/userActions"
import Icon from "react-native-vector-icons/FontAwesome"
import OctiIcon from "react-native-vector-icons/Octicons"

type RootStackParamList = {
  Home: undefined
  Login: undefined
  UserUpdate: undefined
}

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { user } = useSelector((state: RootState) => state.userReducer)
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

  const Logout = async () => {
    dispatch(logout())
    navigation.navigate("Login")
  }

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
        <UserInfoBox>
          {/* {user?.user_metadata.profile_image ? <UserProfile name="user-circle" /> : <UserProfile name="user-circle" />} */}
          <UserProfile name="user-circle" />
          <Text>
            <UserNameLabel>{user?.email || "홍길동"}</UserNameLabel> <UserHelloLabel>님 {"\n"}안녕하세요</UserHelloLabel>
            {/* <UserNameLabel>{user?.user_metadata.username || ""}</UserNameLabel> <UserHelloLabel>님 {"\n"}안녕하세요</UserHelloLabel> */}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <OctiIcon name="heart-fill" size={16} />
            <LikedChallengesList>{likeCount}</LikedChallengesList>
          </View>
        </UserInfoBox>
        <ButtonBox>
          <Button onPress={() => Logout()} style={{ flexDirection: "row", gap: "10" }}>
            <Text>로그아웃</Text>
            <Icon name="chevron-right" size={16} />
          </Button>
          <Button onPress={() => MemberOut()} style={{ flexDirection: "row", gap: "10" }}>
            <Text>회원탈퇴</Text>
            <Icon name="chevron-right" size={16} />
          </Button>
          <Button onPress={() => navigation.navigate("UserUpdate")} style={{ flexDirection: "row", gap: "10" }}>
            <Text>회원정보 수정</Text>
            <Icon name="chevron-right" size={16} />
          </Button>
        </ButtonBox>
        {/* < */}
      </ProfileBox>
    </ProfileTopBox>
  )
}

// ------------------- style ------------------- //

const ProfileTopBox = styled.View`
  width: 100%;
  height: 100%;
`

const ProfileBox = styled.View`
  width: 100%;
  height: 150px;
  background-color: #ffffff;
`

const UserInfoBox = styled.View`
  flex-direction: row;
  width: 90%;
  height: 70px;
  gap: 30px;
  margin: 20px auto;
  align-items: center;
  justify-content: center;
`

const UserProfile = styled(Icon)`
  font-size: 50px;
`

const ButtonBox = styled(View)`
  flex-direction: row;
  width: 70%;
  gap: 20px;
  margin: 5px auto;
`

const Button = styled(TouchableOpacity)`
  margin: 0px auto;
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

const LikedChallengesList = styled(Text)`
  margin-left: 10px;
`
