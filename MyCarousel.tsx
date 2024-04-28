import React, {useState, useRef} from 'react';
import {Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

interface CarouselItem {
  title: string;
  text: string;
}

interface MyCarouselProps {
  items: CarouselItem[];
}

const MyCarousel: React.FC<MyCarouselProps> = ({items}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<Carousel<CarouselItem>>(null);

  const renderItem = ({item, index}: {item: CarouselItem; index: number}) => {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}>
        <Text style={{fontSize: 30}}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      <Carousel
        layout="default"
        ref={carouselRef}
        data={items}
        sliderWidth={300}
        itemWidth={300}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={items.length}
        activeDotIndex={activeIndex}
        containerStyle={{backgroundColor: 'transparent', paddingVertical: 8}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  );
};

export default MyCarousel;
