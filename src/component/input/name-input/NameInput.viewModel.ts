import { useCallback, useMemo, useState } from "react";
import debounce from 'lodash/debounce';
import { NameInputPropsInterface } from "./NameInput.types";
import { Utils } from "../../../utils";

export const useViewModel = (props: NameInputPropsInterface) => {
    const { positionName } = props;

    const [error, setError] = useState('');

    const floatingLabel = useMemo(() => {
        const labelDefault = {
            ['first']: 'First Name',
            ['last']: 'Last Name',
        };
        return labelDefault[positionName];
    }, [positionName]);

    const placeholder = useMemo(() => {
        const placeholderDefault = {
            ['first']: 'Ryan',
            ['last']: 'Reynolds',
        };
        return Utils.generateExample(placeholderDefault[positionName]);
    }, [positionName]);

    const onValidate = useCallback(debounce((result: boolean = false) => {
        if (result) {
            setError('');
        } else {
            setError(`Invalid Name. ${placeholder}`);
        }
        props?.onValidate?.(result);
    }, 50), [placeholder]);

    const onChangeText = useCallback((text: string) => {
        props?.onChangeText?.(text);
        if (!text) {
            onValidate(false)
        }
    }, []);

    return {
        selectors: {
            error,
            floatingLabel,
            placeholder,
        },
        handlers: {
            onValidate,
            onChangeText,
        },
    };
};