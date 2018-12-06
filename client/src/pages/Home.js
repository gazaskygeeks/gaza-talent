import React from "react";
import moment from "moment";
import styled from "styled-components";
import {
  UNTIL_AVAILABLE,
  IS_AVAILABLE,
  TECHNOLOGIES_EXPERIENCE
} from "../constants/airtableKeys";
import * as r from "ramda";

const HomeContainer = styled.section.attrs({
  className: "black w-90 db center"
})``;

const ListingItemList = styled.ul.attrs({
  className: "ph0"
})``;

const ListingItem = styled.li.attrs({
  className:
    "list ph2 pv3 db mb2 bg-near-white br2 flex flex-column justify-between"
})``;

const ListingItemNameText = styled.h3.attrs({
  className: "f3 b tracked ttu mb0"
})``;

const monthAvailable = listing => {
  if (listing.fields[IS_AVAILABLE] === "Yes") return "Currently available";
  const monthsUntilAvailableRaw = listing.fields[UNTIL_AVAILABLE];
  const monthsUntilAvailable = monthsUntilAvailableRaw.split(" ")[0];
  const month = moment(listing._rawJson.createdTime)
    .add(monthsUntilAvailable, "months")
    .format("MMMM");
  return `Available from ${month}`;
};

const ListingItemTag = styled.li.attrs({
  className: ({ colour }) =>
    `br3 f6 b pv1 ph2 bg-light-${colour} dib mb2 mr1 black`
})``;

const ListingItemAvailability = ({ listing }) => {
  const timeAvailable = monthAvailable(listing);
  return <div className="pa2 f4 mid-gray">{timeAvailable}</div>;
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
            <section className="pl2">
              {r.addIndex(r.map)((field, i) => {
                const tagColours = ["green", "pink", "blue", "red"];
                const colour = tagColours[i % tagColours.length];
                return (
                  <ListingItemTag colour={colour} key={`tag-${i}`}>
                    {field}
                  </ListingItemTag>
                );
              })(listing.fields[TECHNOLOGIES_EXPERIENCE])}
            </section>
          </ListingItem>
        ))(listingsFiltered)}
      </ListingItemList>
    </HomeContainer>
  );
};

export default Home;
