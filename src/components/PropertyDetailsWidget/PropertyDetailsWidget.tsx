import {
  Stack,
  TextInput,
} from '@mantine/core';
import React, { useMemo } from 'react';
import { Property } from '../Sidebar/Sidebar';


type PropertyDetail = string | number;
type PropertyEntry = PropertyDetail | null | undefined;

export type PropertyDetailsWidgetProps = {
  propertyData: Property;
};

/* Labels should have underscores instead of spaces
   and should be capitalized on each word */
const parseLabel = (key: string) => (
  key
    .replace(/_/g, ' ')
    .replace(
      /\b\w/g,
      (l) => l.toUpperCase(),
    )
)

export function PropertyDetailsWidget({
  propertyData,
}: PropertyDetailsWidgetProps) {

  const propertyDetails = useMemo(() => {
    const keys = Object.keys(propertyData) as (
      (keyof Property)[]
    );
    return keys.reduce(
      (acc, key) => {
        const value: PropertyEntry = propertyData[key];
        const label = parseLabel(key);
        if (value !== null && value !== undefined) {
          acc.push(
            <TextInput
              key={key}
              label={label}
              value={value}
              disabled={true}
              readOnly={true}
            />,
            // <Group
            //   key={key}
            //   grow={true}
            //   noWrap={true}
            //   position="apart"
            // >
            //   <Text>{label}</Text>
            //   <Badge
            //     variant="outline"
            //     size="lg"
            //   >{value}</Badge>
            // </Group>
          );
        }
        return acc;
      },
      [] as JSX.Element[],
    );
  }, [propertyData]);

  return (
      <Stack>
        {propertyDetails}
      </Stack>
  );
}
