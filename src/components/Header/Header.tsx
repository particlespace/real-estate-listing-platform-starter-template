import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Header as MantineHeader,
  Group,
  Container,
  Burger,
  Button,
  Transition,
  Paper,
  Drawer
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Logo } from '../Logo/Logo';
import {
  HEADER_HEIGHT,
  useStyles
} from './styles';

export interface HeaderProps {
  links: {
    link: string;
    label: string
  }[];
}

export function Header({ links }: HeaderProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const [isLoggedIn, setLogin] = useState(false);
  const {
    classes,
    cx
  } = useStyles();

  const items = useMemo(
    () => (
      links.map((link) => (
        <a
          key={link.label}
          href={link.link}
          className={cx(
            classes.link, {
              [classes.linkActive]: active === link.link
            },
          )}
          onClick={(event) => {
            event.preventDefault();
            setActive(link.link);
          }}
        >
          {link.label}
        </a>
      ))
    ),
    [active, links, cx, classes],
  );

  const handleLogin = useCallback(() => {
    setLogin(!isLoggedIn);
    
  }, [isLoggedIn])

  const handleRegister = useCallback(() => {
    console.log('Handle Register Callback')
  }, [])

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.header}>
      <Drawer
        opened={opened}
        onClose={() => toggleOpened(false)}
        padding="xl"
        size="xl"
      >
        <Container size={'sm'}>
          {items}
        </Container>
      </Drawer>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size="sm"
          className={classes.burger}
        />
        <Transition
          transition="pop-top-right"
          duration={200}
          mounted={opened}
        >
          {(styles) => (
              <Paper
                className={classes.dropdown}
                withBorder
                style={styles}
              >
                {items}
              </Paper>
          )}
        </Transition>
        <Group
          className={classes.links}
          spacing={5}
        >
          {items}
        </Group>
        <Logo />
        <Group
          spacing={0}
          className={classes.authentication}
          position="right"
          noWrap
        >
          <Button
           size="xs"
           variant="subtle"
           onClick={handleLogin}
          >
            Login
          </Button>
          <Button
           size="xs"
           variant="subtle"
           onClick={handleRegister}
          >
            Register
          </Button>
        </Group>
      </Container>
    </MantineHeader>
  );
}
