import {
  Stack,
  TextInput,
} from '@mantine/core';
import React, {
  useMemo
} from 'react';
import { IProperty } from '../Sidebar/Sidebar';

type PropertyDetail = string | number;
type PropertyEntry = PropertyDetail | null | undefined;

export type PropertyDetailsWidgetProps = {
  propertyData: IProperty;
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
      (keyof IProperty)[]
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
