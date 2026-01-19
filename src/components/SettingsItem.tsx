import { CaretRightIcon } from "phosphor-react-native";
import { Text } from "react-native";
import { ScaleButton } from "./ScaleButton";

interface SettingsItemProps {
  icon: any;
  label: string;
  isLast?: boolean;
  className?: string;
  onPress?: () => void;
}

const SettingsItem = ({ icon: Icon, label, isLast, onPress, className }: SettingsItemProps) => (
  <ScaleButton 
    onPress={onPress}
    className={`flex-row items-center px-5 py-7 rounded-2xl bg-surface-light ${className} ${!isLast ? '' : ''}`}
  >
    <Icon size={24} color="#606062" weight="regular" />
    <Text className="flex-1 ml-4 font-poppins text-sutle">
      {label}
    </Text>
    <CaretRightIcon size={20} color="#9CA3AF" weight="bold" />
  </ScaleButton>
);

export default SettingsItem;
