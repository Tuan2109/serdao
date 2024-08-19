import { TextInputProps } from "react-native";

export interface SerdaoInputPropsInterface extends TextInputProps, RegexFunctionInterface {
    serdaoInputType?: SerdaoInputTypeEnum;
    floatingLabel?: string;
    hideMessageError?: boolean;
    messageError?: string;
    require?: boolean;
};

interface RegexFunctionInterface {
    regex?: RegExp;
    onValidate?: (result: boolean) => void;
};

export enum SerdaoInputTypeEnum {
    default = 'default',
    name = 'name',
    iban = 'iban',
};
