import {Card, Image, Text, Badge, Button, Group, useMantineTheme} from '@mantine/core';

export interface ListingProps {
    image: string,
    title: string,
    desc: string,
    sold: boolean,
    link: string,
}

export function Listing(ListingProps) {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];


    return (
        <div style={{width: 340, margin: 'auto'}}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image src={ListingProps.image} height={160} alt="Norway"/>
                </Card.Section>

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Text weight={500}>{ListingProps.title}</Text>
                    <Badge color="pink" variant="light">
                        {ListingProps.sold ? "On Sale" : "Sold"}
                    </Badge>
                </Group>

                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {ListingProps.desc}
                </Text>

                <Button variant="light" color="blue" ref={ListingProps.link} fullWidth style={{marginTop: 14}}>
                    Book classic tour now
                </Button>
            </Card>
        </div>
    );
}
