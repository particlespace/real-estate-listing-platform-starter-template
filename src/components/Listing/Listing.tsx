import {
  useState,
  useCallback,
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
import {
  IJsonPropertyData,
  IPropertyData,
} from "../Sidebar/Sidebar";
import { SetPropertyData } from "../../App";
import { searchProperty } from "../../apiOperations";

export interface PropertyQuery {
  addressNumber: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface IListingCardProps {
  property: IJsonPropertyData;
  setPropertyData: SetPropertyData;
  propertyData: IPropertyData;
}

export function Listing({
  property,
  setPropertyData,
  propertyData,
}: IListingCardProps) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const theme = useMantineTheme();
  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];
  const {
    address: addressObject,
    estimateListSellPrice: price,
    sold,
    image
  } = property
  const {
    address,
    city,
    state,
    zipcode
  } = addressObject;
  const propertyAddress = `${address}, ${city}, ${state} ${zipcode}`

  const onClick = useCallback(async () => {
    setLoading(true)
    const propertyData = await searchProperty(addressObject).then((response) =>{
      return response;
    })
    setPropertyData(propertyData)
    setOpen(true);
    setLoading(false)
  }, [
    setLoading,
    setPropertyData,
    setOpen,
    addressObject
  ]);

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
            ${price}
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
          {propertyAddress}
        </Text>
        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{
            marginTop: 14
          }}
          onClick={onClick}
          loading={isLoading}
        >
          More Info
        </Button>
      </Card>
    </div>
  );
}
