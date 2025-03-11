import { useState } from "react";
import { Stack } from "expo-router";
import { Button, SizableText, styled, View, YStack } from "tamagui";

export default function HomeScreen() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Stack.Screen options={{ title: "Home" }} />
            <View>
                <Styled.VerticalStack>
                    <Styled.Text>Count: {count}</Styled.Text>
                    <Button onPress={() => setCount((prev) => prev + 1)}>+1</Button>
                </Styled.VerticalStack>
            </View>
        </>
    );
}

const Styled = {
    VerticalStack: styled(YStack, {
        alignSelf: "center",
        justifyContent: "center",
        minHeight: "100%",
    }),
    Text: styled(SizableText, {
        fontWeight: 700,
        fontSize: "$6",
    }),
};
