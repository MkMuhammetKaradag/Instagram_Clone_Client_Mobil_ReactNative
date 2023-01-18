import { TouchableOpacity } from "react-native";
import React from "react";

type MultiTapOverlayPropsType = {
  onLongPress: () => void;
  onMultiTaps: () => void;
  multiTapCount?: number;
  multiTapDelay?: number;
  children: React.ReactNode;
};
const MultiTapOverlay = ({
  onLongPress,
  onMultiTaps,
  multiTapCount = 2,
  multiTapDelay = 300,
  children,
}: MultiTapOverlayPropsType) => {
  const [lastPress, setLastPress] = React.useState<number>(0);
  const [tapCount, setTapCount] = React.useState(0);

  const handlePress = () => {
    const now = Date.now();

    setLastPress(now);
    if (now - lastPress <= multiTapDelay) {
      if (tapCount < multiTapCount - 1) {
        setTapCount(tapCount + 1);
      } else {
        setTapCount(0);

        onMultiTaps && onMultiTaps();
      }
    } else {
      setTapCount(1);
    }
  };
  const handleLongPress = () => onLongPress && onLongPress();

  return (
    <TouchableOpacity
      delayLongPress={1000}
      activeOpacity={0.8}
      onLongPress={handleLongPress}
      onPress={handlePress}
    >
      {children}
    </TouchableOpacity>
  );
};
export default MultiTapOverlay;
