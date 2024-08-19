import { TextInput } from "react-native";
import { SerdaoInputPropsInterface } from "../serdao-input/SerdaoInput.types";

export interface NameInputPropsInterface extends SerdaoInputPropsInterface {
    positionName: 'last' | 'first';
}
