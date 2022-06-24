import {
  Stack, TextInput,
} from '@mantine/core';
import React, { useMemo } from 'react';
import {
  GeneralConstants
} from '../ResultContent/ResultContent';

export type ConfidenceMessage = {
  message: string,
  type: string
}

export type GeneralWidgetProps = {
  generalConstants: GeneralConstants,
  confidenceMessages: ConfidenceMessage[],
  openHouses: any[],
  units: any[],
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

export function GeneralWidget({
  generalConstants,
  // confidenceMessages,
  // openHouses,
  // units,
}: GeneralWidgetProps) {

  const generalConstantsItems = useMemo(() => {
    const constantsKeys = Object.keys(
      generalConstants
    ) as (keyof GeneralConstants)[];
    return constantsKeys.reduce(
      (acc, key) => {
        const label = parseLabel(key);
        const value = generalConstants[key];
        if (
          value !== null &&
          value !== undefined
        ) {
          acc.push(<TextInput
            key={key}
            label={label}
            value={value}
            disabled={true}
            readOnly={true}
          />);
        }
        return acc;
      },
      [] as JSX.Element[],
    );
  }, [generalConstants]);

  return (
    <Stack>
      {generalConstantsItems}
    </Stack>
  );
}
