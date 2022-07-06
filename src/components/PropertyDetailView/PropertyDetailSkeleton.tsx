import {
  Skeleton,
} from '@mantine/core';

export default function PropertyDetailSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }}
    >
      <Skeleton
        visible={true}
        width={675}
        height={600}
      />
      <Skeleton
        visible={true}
        width={700}
        height={600}
      />
      <Skeleton
        visible={true}
        width={700}
        height={1000}
      />
      <Skeleton
        visible={true}
        width={700}
        height={500}
      />
    </div>
  )
}
