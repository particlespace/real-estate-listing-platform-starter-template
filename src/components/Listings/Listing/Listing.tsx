import { useCallback } from 'react';
import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    useMantineTheme
} from '@mantine/core';

interface ListingProps {
    image: string;
    sold: boolean;
    address: string;
    price: string | number;
    setOpen: (open: boolean) => void;
}

export function Listing({
    image,
    sold,
    address,
    price,
    setOpen,
}: ListingProps) {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    const onClick = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    return (
        <div style={{width: 340, margin: 'auto'}}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image src={image} height={160} alt="Norway"/>
                </Card.Section>

                <Group position="apart" style={{marginBottom: 5, marginTop: theme.spacing.sm}}>
                    <Text weight={500}>{price}</Text>
                    <Badge color={sold ? "pink" : "green"} variant="light">
                        {sold ? "Sold" : "On Sale"}
                    </Badge>
                </Group>

                <Text size="sm" style={{color: secondaryColor, lineHeight: 1.5}}>
                    {address}
                </Text>

                <Button variant="light" color="blue" fullWidth style={{marginTop: 14}} onClick={onClick}>
                    More Info
                </Button>
            </Card>
        </div>
    );
}
