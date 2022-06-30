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

import qs from "qs";
import
  axios, {
  AxiosError,
  AxiosResponse
} from "axios";
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

/**
 * Configure property query for use
 */
const getPropertyData = (queryAddress: PropertyQuery) => {
  const {
    addressNumber,
    address,
    city,
    state,
    zipcode
  } = queryAddress;

  /**
   * Authorization header for the Particle Space API
   */
  const data = qs.stringify({
    'secret_key': process.env.REACT_APP_PARTICLE_SPACE_SECRET_KEY,
    'publish_key': process.env.REACT_APP_PARTICLE_SPACE_PUBLISH_KEY,
  });
  const authorizationConfig = {
    method: 'post',
    url: 'https://api.particlespace.com/api/v1/authenticate',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  axios(authorizationConfig)
  .then(function (response: AxiosResponse) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error: AxiosError) {
    console.log(error);
  });

  /**
   * Particle Space search API
   */
  const searchConfig = {
    method: 'get',
    url: `https://api.particlespace.com/api/v1/property/search?address=${addressNumber} ${address}&city=${city}&state=${state}&zipcode=${zipcode}`,
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN
    }
  };

  axios(searchConfig)
  .then(function (response: AxiosResponse) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error: AxiosError) {
    console.log(error);
  });
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
