import { useEffect, useState } from "react"
import styled from "styled-components/native"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { supabase } from "../db/supabase"
import { View, Text, TouchableOpacity } from "react-native"

type RootStackParamList = {
  TabNavigator: undefined
  Login: undefined
  UserUpdate: undefined
}

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          console.error("Error fetching user:", error.message)
          return
        }
        console.log("Logged in user:", data.user?.email)
        setUser(data?.user ?? null)
      } catch (error) {}
    }

    fetchUser()
  }, [])

  const Logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) alert("로그아웃 중에 문제가 생겼습니다.")
    else {
      alert("로그아웃 되었습니다")
      navigation.navigate("Login")
    }
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
        const { error: deleteUserError } = await supabase.rpc<void>("delete_user", { user_id: user.id })

        if (deleteUserError) {
          console.error("회원 탈퇴 중에 문제가 생겼습니다:", deleteUserError.message)
        } else {
          alert("회원 탈퇴 되었습니다")
          navigation.navigate("TabNavigator")
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
    <ProfileBox>
      <View>
        <Text>{user?.email || ""} 님 환영합니다.</Text>
      </View>
      <Button onPress={() => Logout()}>
        <Text>로그아웃</Text>
      </Button>
      <Button onPress={() => MemberOut()}>
        <Text>회원탈퇴</Text>
      </Button>
      <Button onPress={() => navigation.navigate("UserUpdate")}>
        <Text>회원정보 수정</Text>
      </Button>
    </ProfileBox>
  )
}

// ------------------- style ------------------- //

const ProfileBox = styled.View`
  width: 100%;
  height: 150px;
  background-color: #ffffff;
`

const Button = styled(TouchableOpacity)`
  margin-bottom: 20px;
  border: 2px solid black;
  width: 40%;
`
