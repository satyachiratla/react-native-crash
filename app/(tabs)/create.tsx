import { useState } from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { CustomButton, FormField } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useAuthContext } from "@/store/AuthContext";

const Create = () => {
  const [form, setForm] = useState<any>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const [uploading, setUploading] = useState(false);
  const { user } = useAuthContext();

  const { title, video, thumbnail, prompt } = form;

  const openPicker = async (selectType: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm((prevForm: any) => {
          return {
            ...prevForm,
            thumbnail: result.assets[0],
          };
        });
      }

      if (selectType === "video") {
        setForm((prevForm: any) => {
          return {
            ...prevForm,
            video: result.assets[0],
          };
        });
      }
    }
    //  else {
    //   setTimeout(() => {
    //     Alert.alert("Document Picked", JSON.stringify(result, null, 2));
    //   }, 100);
    // }
  };

  const uploadVideoHandler = async () => {
    if (!title || !thumbnail || !video || !prompt) return;
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded success");
      router.push("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        prompt: "",
        video: null,
        thumbnail: null,
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          placeholder="Give your video a catch title..."
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {video ? (
              <Video
                source={{ uri: video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {thumbnail ? (
              <Image
                source={{ uri: thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="contain"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          placeholder="The prompt you used to create this video"
          otherStyles="mt-10"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={uploadVideoHandler}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
