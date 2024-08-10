import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import icons from "@/constants/icons";
import * as Animatable from "react-native-animatable";

type TrendingProps = {
  posts: any;
};

type TrendingItemProps = {
  activeItem: any;
  item: any;
};

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
} as Animatable.CustomAnimation;

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
} as Animatable.CustomAnimation;

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: "https://rr1---sn-cvh76nld.googlevideo.com/videoplayback?expire=1723293512&ei=5wq3Zv_wO7D7sfIPl_iE2As&ip=136.0.207.22&id=o-AHKqbTtWBlDB2pZPw2QxSREvAhm_MTy3eqQyOydy-N1L&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXc671Jij9W2H5XTX_NLkEeXyQcT2POcvelAKYyb0OOVn3vWQnyEvrug1junIlxisOPXYxPMUnwjUeGr&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=1435455&ratebypass=yes&dur=19.050&lmt=1722316710459290&c=MEDIA_CONNECT_FRONTEND&txp=5530434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgOQFge0vxhM0xSl5FXgjTtb71gpbaibPnt5B1FiyJdeUCIQDE-A9aJbOdzN3voP292ehTbeScJmJY-yeQqA05H_9HLA%3D%3D&title=Deadpool%20and%20Wolverine%20-%20Bye%20Bye%20Bye%20-%20NSYNC%20&rm=sn-n4vse7s&rrc=104,80&fexp=24350516,24350518,24350557,24350561&req_id=5db4e584acd8a3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-524pcxgpo-8u1s7e&cms_redirect=yes&cmsv=e&mh=de&mip=223.196.172.165&mm=29&mn=sn-cvh76nld&ms=rdu&mt=1723271572&mv=m&mvi=1&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRQIgA9JJzzpJXP8A7cZuPB3DEKuhJinfCvJDaZTsHlHbvkICIQDUHNvTDige7b8a64mfJ6rPfICk8PuhZjNc05fZTHNadg%3D%3D#nsync%20#deadpoolandwolverinetrailer%20#shorts%20#dance#edit",
          }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay((prev) => !prev)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 shadow-lg rounded-[35px] shadow-black/40 my-5 overflow-hidden"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChangedHandler = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChangedHandler}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
