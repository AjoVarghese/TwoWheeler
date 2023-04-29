import React from "react";
import "./Navbar.css";
// import { FaBeer } from 'react-icons/fa';
// import {GiHamburgerMenu} from 'react-icons/gi'
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../redux/Actions/USER_ACTIONS/LogoutAction";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Avatar,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLoginReducer);
  const { userLoginDetails } = user;
  console.log("DDDDD", userLoginDetails);

  const logout = () => {
    dispatch(userLogoutAction());
    navigate("/login");
  };
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <div>
      <Box pb={120}>
        <Header height={60} px="md" style={{ backgroundColor: "#fed250" }}>
          <Group position="apart" sx={{ height: "100%" }}>
            {/* <MantineLogo size={30} /> */}
            <h1 style={{ fontSize: "27px" }}>Two Wheeler</h1>

            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <a className={classes.link}>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                  <h6>Home</h6>
                </Link>
              </a>

              <a className={classes.link}>
                <Link
                  to="/bikes"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <h6>Bikes</h6>
                </Link>
              </a>
              <a className={classes.link}>
                <Link
                  to="/rent-bikes"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <h6>Rent Your Bike</h6>
                </Link>
              </a>

              <a className={classes.link}>
                <Link
                  to="/chat"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <h6>Chat with users</h6>
                </Link>
              </a>
            </Group>
            {userLoginDetails ? (
              <>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={userLoginDetails.Name}
                  className=" profile-dropdown yellow-button"
                  // style={{ backgroundColor: "black" }}
                >
                  <Avatar
                    image={
                      userLoginDetails ? userLoginDetails.ProfileImage : ""
                    }
                    src={userLoginDetails ? userLoginDetails.ProfileImage : ""}
                    size="xlarge"
                    shape="circle"
                  />
                  <Dropdown.Item>
                    <Link
                      to="/profile"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      My Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to="/my-rents"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      My Rides
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to="/rented-bikes"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      My Rents
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </DropdownButton>
              </>
            ) : (
              <Group className={classes.hiddenMobile}>
                <Button>
                  <Link
                    to="/login"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </Button>
                <Button>
                  <Link
                    to="/signup"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Sign up
                  </Link>
                </Button>
              </Group>
            )}

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <a href="#" className={classes.link}>
              Home
            </a>
            {/* <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton> */}
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
              Bikes
            </a>
            <a href="#" className={classes.link}>
              Rent A Bike
            </a>

            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <Group position="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </div>
  );
}

export default Navbar;
