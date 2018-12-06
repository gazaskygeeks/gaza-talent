import React from "react";
import moment from "moment";
import styled from "styled-components";
import { UNTIL_AVAILABLE, IS_AVAILABLE } from "../constants/airtableKeys";
import * as r from "ramda";

const HomeContainer = styled.section.attrs({
  className: "pr3 blue bg-yellow"
})``;

const ListingItemList = styled.ul.attrs({
  className: "ba bw1 b--black"
})``;

const ListingItem = styled.li.attrs({
  className: "list bg-white"
})``;

const ListingItemNameText = styled.h3.attrs({
  className: "f3 b"
})``;

const monthAvailable = listing => {
  if (listing.fields[IS_AVAILABLE] === "Yes") return "today";
  const monthsUntilAvailableRaw = listing.fields[UNTIL_AVAILABLE];
  const monthsUntilAvailable = monthsUntilAvailableRaw.split(" ")[0];
  return moment(listing._rawJson.createdTime)
    .add(monthsUntilAvailable, "months")
    .format("DD MMMM");
};

const ListingItemAvailability = ({ listing }) => {
  const timeAvailable = monthAvailable(listing);
  return <section>Available from: {timeAvailable}</section>;
};

const Home = ({ listings }) => {
  const listingsFiltered = r.filter(listing => {
    const fields = listing.fields;
    if (!fields[IS_AVAILABLE]) {
      if (fields[UNTIL_AVAILABLE] === "Other") return false;
      if (fields[UNTIL_AVAILABLE] === "") return false;
    }
    return true;
  })(listings);
  return (
    <HomeContainer>
      <ListingItemList>
        {r.map(listing => (
          <ListingItem key={listing.id}>
            <ListingItemNameText>{listing.fields.Name}</ListingItemNameText>
            <ListingItemAvailability listing={listing} />
          </ListingItem>
        ))(listings)}
      </ListingItemList>
    </HomeContainer>
  );
};

export default Home;
