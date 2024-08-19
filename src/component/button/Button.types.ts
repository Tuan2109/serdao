import {ButtonProps, ViewStyle} from 'react-native';

export interface SerdaoButtonPropsInterface extends ButtonProps {
  type?: SerdaoButtonTypeEnum;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
}

export enum SerdaoButtonTypeEnum {
  primary = 'primary',
  secondary = 'secondary',
  disabled = 'disabled',
}

export type DefaultColorInterface = {
  [key in SerdaoButtonTypeEnum]: string;
};
