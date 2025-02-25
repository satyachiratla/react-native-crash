import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getUserVideos, signOut } from "../../lib/appwrite";
import { EmptyState, VideoCard } from "../../components";
import { useAuthContext } from "@/store/AuthContext";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setIsLoggedIn, setUser } = useAuthContext();
  const { data: posts } = useAppwrite(() => getUserVideos(user.$id));

  const logoutHandler = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard videos={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logoutHandler}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              textStyles="text-lg"
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                textStyles="text-xl"
              />
              <InfoBox title="1.2k" subtitle="Followers" textStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
