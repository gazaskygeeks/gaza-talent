import React from "react";
import moment from "moment";
import styled from "styled-components";
import { UNTIL_AVAILABLE } from "../constants/airtableKeys";
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

const ListingItemAvailability = ({ listing }) => {
  const listingCreatedAt = moment(listing._rawJson.createdTime).format(
    "DD MMMM"
  );
  return <section>Listing Created At: {listingCreatedAt}</section>;
};

const Home = ({ listings }) => {
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
