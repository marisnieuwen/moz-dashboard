import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PecentageIcon from "../images/icon-percentage.svg";
import BuildingIcon from "@mui/icons-material/Business"; // Use an appropriate icon
import { useData } from "../context/DataContext";

const CustomCard = styled(Box)({
  display: "flex",
  width: "100%",
  padding: "1rem 0.625rem",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.75rem",
  borderRadius: "0.875rem",
  background: "#FFF",

  /* Shadow_2 */
  boxShadow:
    "-2px 21px 6px 0px rgba(0, 0, 0, 0.00), -1px 14px 5px 0px rgba(0, 0, 0, 0.01), -1px 8px 5px 0px rgba(0, 0, 0, 0.03), 0px 3px 3px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
});

const CustomCardContent = styled(CardContent)({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});

const ScrollableList = styled(List)({
  overflow: "auto",
  maxHeight: "200px", // Adjust the height as needed
  flexGrow: 1,
  "&::-webkit-scrollbar": {
    width: "12px", // Adjust the width of the scrollbar
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1", // Color of the track
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888", // Color of the thumb
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555", // Color of the thumb on hover
  },
  "&::-webkit-scrollbar-button": {
    display: "none", // Remove the arrows
  },
  scrollbarWidth: "thin", // For Firefox
  scrollbarColor: "#888 #f1f1f1", // For Firefox
});

const HeaderFrame = styled(Box)({
  display: "flex",
  height: "2.3125rem",
  padding: "var(--none, 0rem) 0.625rem",
  alignItems: "center",
  gap: "var(--3, 1.5rem)",
  alignSelf: "stretch",
});

const PerTrajectCard = () => {
  const { menteeSchoolData } = useData();

  if (!menteeSchoolData) return <p>Loading...</p>;

  const { schoolsData } = menteeSchoolData;

  return (
    <CustomCard>
      <HeaderFrame>
        <img
          src={PecentageIcon}
          style={{ width: 42, height: 42, marginRight: "1rem" }}
        />
        <Typography variant="h4">Per Traject</Typography>
      </HeaderFrame>
      <CustomCardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="1rem"
        >
          <Box display="flex" alignItems="center" alignSelf="self-end">
            {/* <Typography variant="body2" style={{ marginRight: "0.5rem" }}>
              Filter op percentage
            </Typography>
            <Switch /> */}
          </Box>
        </Box>
        <ScrollableList>
          {schoolsData.map((school, index) => (
            <ListItem
              key={index}
              style={{
                backgroundColor: "#FFFFFF", // Adjust color as needed
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            >
              <ListItemIcon>
                <BuildingIcon />
              </ListItemIcon>
              <ListItemText
                primary={school.name}
                secondary={`${school.evaluationPercentage}% ingevuld`}
              />
            </ListItem>
          ))}
        </ScrollableList>
      </CustomCardContent>
    </CustomCard>
  );
};

export default PerTrajectCard;
