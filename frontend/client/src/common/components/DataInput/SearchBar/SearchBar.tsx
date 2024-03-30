import { useCallback, useRef } from "react";
import { ActionIcon, rem, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

type SearchBarProps = TextInputProps & {
    onSearch: (phrase: string) => unknown;
};

export const SearchBar = ({ onSearch, ...rest }: SearchBarProps) => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const focus = useCallback(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    return (
        <TextInput
            ref={searchInputRef}
            onChange={(e) => onSearch(e.target.value)}
            rightSection={
                <ActionIcon onClick={focus} variant="transparent">
                    <IconSearch style={{ width: rem(20), height: rem(20) }} />
                </ActionIcon>
            }
            {...rest}
        />
    );
};
