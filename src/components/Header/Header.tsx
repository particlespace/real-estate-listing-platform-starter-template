import React, {
  useCallback,
  useState
} from 'react';
import {
  Header as MantineHeader,
  Group,
  Container,
  Burger,
  Button
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Logo } from '../Logo/Logo';
import {
  HEADER_HEIGHT,
  useStyles
} from './styles';


export interface HeaderProps {
  links: { link: string; label: string }[];
}

export function Header({ links }: HeaderProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const {
    classes,
    cx
  } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  const handleLogin = useCallback(() => {
    console.log('Handle Login Callback')
  }, [])

  const handleRegister = useCallback(() => {
    console.log('Handle Register Callback')
  }, [])

  return (
    <MantineHeader height={HEADER_HEIGHT}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size="sm"
          className={classes.burger}
        />
        <Group className={classes.links} spacing={5}>
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
