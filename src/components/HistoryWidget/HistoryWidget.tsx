import React, { useMemo } from 'react';
import moment from 'moment';
import {
  Center,
  MantineColor,
  Text,
  Timeline
} from '@mantine/core';
import {
  Coin,
  Icon,
  Loader,
  Rotate2,
  Rotate360,
  Tag,
  Trash
} from 'tabler-icons-react';
import { History } from '../Sidebar/Sidebar'

type TimelineItemVariant = {
  icon: Icon;
  color: MantineColor;
  title: string;
}

const timelineItemVariants: Record<string,TimelineItemVariant>  = {
  'sold': {
    icon: Coin,
    color: 'green',
    title: 'Sold',
  },
  'listed': {
    icon: Tag,
    color: 'blue',
    title: 'Listed',
  },
  'price_change': {
    icon: Rotate2,
    color: 'orange',
    title: 'Price Change',
  },
  'pending': {
    icon: Loader,
    color: 'yellow',
    title: 'Pending Sale',
  },
  'relisted': {
    icon: Rotate360,
    color: 'yellow',
    title: 'Relisted',
  },
  'removed': {
    icon: Trash,
    color: 'red',
    title: 'Removed',
  },
}

export type HistoryWidgetProps = {
  data: History[];
};

export function HistoryWidget({
  data,
}: HistoryWidgetProps) {
  const timelineItems: JSX.Element[] = useMemo(() => {
    return data.map(
      (event: History, index: number) => {
        const {
          type,
          date,
          description,
        } = event;

        const variantData = timelineItemVariants[type]
        return (
          <Timeline.Item
            bullet={<variantData.icon size={12} />}
            title={variantData.title}
            key={index}
          >
            <Text color="dimmed" size="sm">
              {description}
              <Text size="xs" mt={4}>
                {moment.utc(date).local().toString()}
              </Text>
            </Text>
          </Timeline.Item>
        );
      }
    );
  }, [data]);

  return (
      timelineItems === [] ? (
        <Center
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Text color="dimmed" size="sm">
            No history available
          </Text>
        </Center>
      ) : (
        <div style={{
          position: 'relative',
          maxHeight: 'calc(100vh - 200px)',
          width: '100%',
        }}>
          <Timeline bulletSize={24} lineWidth={2}>
            {timelineItems}
          </Timeline>
        </div>
      )
  );
}
