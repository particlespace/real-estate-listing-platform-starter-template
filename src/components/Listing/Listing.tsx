import {
  useState,
  useCallback
} from 'react';
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme
} from '@mantine/core';
import PropertyDetailView from '../PropertyDetailView/PropertyDetailView';
import { IPropertyData } from "../Sidebar/Sidebar";

interface ListingProps {
  image: string;
  sold: boolean;
  address: string;
  price: string | number;
  propertyData: IPropertyData;
}
export interface PropertyQuery {
  addressNumber: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

export function Listing({
  image,
  sold,
  address,
  price,
  propertyData
}: ListingProps) {
  const [isOpen, setOpen] = useState(false);
  const theme = useMantineTheme();
  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];
  const onClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <div
      style={{
        width: 340,
        margin: 'auto'
      }}
    >
      <PropertyDetailView
        isOpen={isOpen}
        setOpen={setOpen}
        propertyData={propertyData}
      />
      <Card
        shadow="sm"
        p="lg"
      >
        <Card.Section>
          <Image
            src={image}
            height={160}
            alt="Norway"
          />
        </Card.Section>
        <Group
          position="apart"
          style={{
            marginBottom: 5,
            marginTop: theme.spacing.sm
          }}
        >
          <Text weight={500}>
            {price}
          </Text>
          <Badge
            color={sold ? "pink" : "green"}
            variant="light"
          >
            {sold ? "Sold" : "On Sale"}
          </Badge>
        </Group>
        <Text
          size="sm"
          style={{
            color: secondaryColor,
            lineHeight: 1.5
          }}
        >
          {address}
        </Text>
        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{
            marginTop: 14
          }}
          onClick={onClick}
        >
          More Info
        </Button>
      </Card>
    </div>
  );
}
