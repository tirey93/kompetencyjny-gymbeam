import { useCallback, useRef } from "react";
import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import classes from "./SearchBar.module.scss";

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
            className={classes.searchBar}
            ref={searchInputRef}
            onChange={(e) => onSearch(e.target.value)}
            rightSection={
                <ActionIcon onClick={focus} variant="transparent">
                    <IconSearch className={classes.icon} />
                </ActionIcon>
            }
            {...rest}
        />
    );
};
