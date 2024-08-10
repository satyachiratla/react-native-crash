import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import images from "@/constants/images";
import CustomButton from "./CustomButton";

type EmptyStateProps = {
  title: string;
  subTitle: string;
};

const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="font-psemibold text-white text-xl text-center">
        {title}
      </Text>
      <Text className="text-xl mt-2 text-center font-psemibold text-gray-100">
        {subTitle}
      </Text>
      <CustomButton
        title="Create Video"
        containerStyles="w-full my-5"
        handlePress={() => router.push("/(tabs)/create")}
      />
    </View>
  );
};

export default EmptyState;
