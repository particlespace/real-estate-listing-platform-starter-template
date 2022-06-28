import React from 'react';
import {
  Group,
  Stack,
  Text,
  Image,
  Container,
  Title, Card,
} from '@mantine/core';
import { useMemo } from 'react';
import {
  HistoryWidget,
} from '../HistoryWidget/HistoryWidget';
import {
  PropertyDetailsWidget,
} from '../PropertyDetailsWidget/PropertyDetailsWidget';
import {
  ConfidenceMessage, GeneralWidget,
} from '../GeneralWidget/GeneralWidget';
import { useStyles } from './ResultContent.styles';
import {
  IPropertyData,
  History,
  Property
} from "../Sidebar/Sidebar";

export type GeneralConstants = {
  classification?: string,
  confidence: number,
  estimate_list_sell_price: number,
  last_sold_date: string,
  neighborhood_median: number,
  sources: number;
}

export type RequestData = GeneralConstants & {
  address: {
    address_number: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
  };
  history: Array<any>;
  images: Array<string>;
  property: Property;
  confidence_messages: Array<ConfidenceMessage>,
  open_houses: {date: string; time: string;}[],
  units: any[]
};

const generalConstantsFields = [
  'classification',
  'confidence',
  'estimate_list_sell_price',
  'last_sold_date',
  'neighborhood_median',
  'sources',
] as (keyof GeneralConstants)[];

interface ListingDetails {
  salePrice: number;
  views: number;
  recentActivity: string;
}

export type ResultContentProps = {
  data: IPropertyData;
  listingDetails: ListingDetails;
};

/**
 * Formatts a key for copying to clipboard.
 * @param {string} key
 * @returns {string}
 */
const formatKey = (key: string) => (
  key.split('_').reduce((acc, curr) => {
    const wordSeparator = acc.length > 0 ? ' ' : '';
    return acc + wordSeparator+ curr.charAt(0).toUpperCase() + curr.slice(1);
    // open_houses
  }, '')
);

/**
 * Recursively formats all keys for nested objects as well
 * as recursively formatting the keys of array items if
 * they are objects.
 */
const formatKeys = (obj: any): typeof obj => {
  if (typeof obj !== 'object') {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map(formatKeys);
  }
  return obj ? (
    Object.fromEntries(
      Object.entries(obj).map(
        ([key, value]) => [
          formatKey(key),
          formatKeys(value)
        ]
      )
    )
  ) : (
    'No Data Available'
  );
}

export function ResultContent({
  data,
  listingDetails,
}: ResultContentProps) {
  const generalConstants = useMemo(() => {
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => (
        generalConstantsFields.includes(
          key as keyof GeneralConstants
        )
      ))
    ) as GeneralConstants;
  }, [data])

  const { classes } = useStyles();

  const imageUrl: string = useMemo(() => {
    const {images} = data;
    return images[0];
  }, [data.images]);

  const propertyData: Property = useMemo(() => {
    const {property} = data;
    return property;
  }, [data.property])

  const historyData: History[] = useMemo(() => {
    const {history} = data;
    return history;
  }, [data.history]);

  return (
    <Stack
      align='center'
      style={{
        height: 'max-content',
      }}
    >
      <Card shadow="md">
        <Title order={3}>Listing Details</Title>
        <Image
          src={imageUrl}
          width={'100%'}
          radius={2}
          fit='cover'
          styles={{
            root: {
              display: 'flex',
              justifyContent: 'center',
            }
          }}
        />
        <Stack>
          <Group position="apart">
            <Text
              size="md"
              weight="bold"
              color="black"
            >
              Sale Price:
            </Text>
            <Text
              size="md"
              weight="bold"
              color="green"
            >
              {`${listingDetails.salePrice}`}
            </Text>
          </Group>
          <Group position="apart">
            <Text
              size="md"
              weight="bold"
              color="black"
            >
              Views:
            </Text>
            <Text
              size="md"
              weight="bold"
              color="green"
            >
              {`${listingDetails.views}`}
            </Text>
          </Group>
          <Group position="apart">
            <Text
              size="md"
              weight="bold"
              color="black"
            >
              Recent Activity:
            </Text>
            <Text
              size="md"
              weight="bold"
              color="green"
            >
              {`${listingDetails.recentActivity}`}
            </Text>
          </Group>
        </Stack>
      </Card>
      <Container size="md" className={classes.wrapper}>
        <Stack>
          <Card shadow="md">
            <Title order={3}>General Information</Title>
            <GeneralWidget
              generalConstants={generalConstants}
            />
          </Card>
          <Card shadow="md">
            <Title order={3}>Property Details</Title>
            <PropertyDetailsWidget
              propertyData={propertyData}
            />
          </Card>
          <Card shadow="md">
            <Title order={3}>History</Title>
            <HistoryWidget data={historyData} />
          </Card>
        </Stack>
      </Container>
    </Stack>
  );
}
