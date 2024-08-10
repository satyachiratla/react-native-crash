import { View, Text } from "react-native";
import React from "react";

type InfoBoxProps = {
  title: string | number;
  containerStyles?: string;
  textStyles: string;
  subtitle?: string;
};

const InfoBox = ({
  title,
  containerStyles,
  textStyles,
  subtitle,
}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${textStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
