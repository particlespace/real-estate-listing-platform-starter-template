import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => {
  const control = getRef('control');

  return {
    wrapper: {
      padding: 0,
      margin: 0,
      marginLeft: -17,
      width: '100%',
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.xl * 2,
      minHeight: 'max-content',
    },

    title: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 20,
      marginLeft: -7,
      width: 320,
      height: 50,
      boxShadow: '0px 0px 0px 1px rgb(0,0,0,.1)',
      fontWeight: 600,
      color: '#3a9bf2',
      marginBottom: theme.spacing.xl * 1.5,
    },

    control: {
      ref: control,
      '&:hover': {
        color: '#3a9bf2',
        backgroundColor: 'transparent',
      },
    },

    item: {
      width: '300px',
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing.lg,
      border: `0px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3]
      }`,
    },

    itemOpened: {
      [`& .${control}`]: {
        color: '#3a9bf2',
      },
    },
  };
});

